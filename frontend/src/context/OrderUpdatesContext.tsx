import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface OrderUpdate {
  id: string;
  status: string;
  customerName: string;
}

interface OrderUpdatesContextType {
  lastUpdate: OrderUpdate | null;
}

const OrderUpdatesContext = createContext<OrderUpdatesContextType | undefined>(undefined);

export const OrderUpdatesProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastUpdate, setLastUpdate] = useState<OrderUpdate | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Subscribe to INSERT events on the 'orders' table
    const subscription = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          const newOrder = payload.new as any;
          
          setLastUpdate({
            id: newOrder.id,
            status: newOrder.status,
            customerName: newOrder.customer_name || 'Customer'
          });

          toast({
            title: "New Order Received!",
            description: `Order #${newOrder.id} has just been placed.`,
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return (
    <OrderUpdatesContext.Provider value={{ lastUpdate }}>
      {children}
    </OrderUpdatesContext.Provider>
  );
};

export const useOrderUpdates = () => {
  const context = useContext(OrderUpdatesContext);
  if (context === undefined) {
    throw new Error('useOrderUpdates must be used within an OrderUpdatesProvider');
  }
  return context;
};