import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { initializeNotificationHandler, cleanupNotificationHandler } from "@/utils/notificationHandler";

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface CustomerNotification {
  id: string;
  orderId: string;
  message: string;
  type: 'order_update' | 'payment_confirmed' | 'contract_ready' | 'delivery_scheduled';
  timestamp: string;
  read: boolean;
  fromPersonnel?: string;
}

interface CustomerAuthContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  notifications: CustomerNotification[];
  unreadNotifications: number;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  markNotificationAsRead: (notificationId: string) => void;
  addNotification: (notification: Omit<CustomerNotification, 'id' | 'timestamp'>) => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const CustomerAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState<CustomerNotification[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check if customer is already authenticated
    const customerData = sessionStorage.getItem("customerAuthenticated");
    if (customerData) {
      const parsedCustomer = JSON.parse(customerData);
      setCustomer(parsedCustomer);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      initializeNotificationHandler(addNotification);
    } else {
      cleanupNotificationHandler();
    }

    return () => {
      cleanupNotificationHandler();
    };
  }, [isAuthenticated]);

  const addNotification = (notificationData: Omit<CustomerNotification, 'id' | 'timestamp'>) => {
    const newNotification: CustomerNotification = {
      ...notificationData,
      id: `n${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast({
      title: "New Notification",
      description: notificationData.message,
    });
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    if (email && password.length >= 6) {
      const mockCustomer: Customer = {
        id: "c1",
        email: email,
        firstName: email.split('@')[0],
        lastName: "Customer"
      };
      
      sessionStorage.setItem("customerAuthenticated", JSON.stringify(mockCustomer));
      setCustomer(mockCustomer);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: "Welcome to your customer dashboard",
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("customerAuthenticated");
    setCustomer(null);
    setIsAuthenticated(false);
    cleanupNotificationHandler();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <CustomerAuthContext.Provider value={{ 
      customer, 
      isAuthenticated, 
      notifications,
      unreadNotifications,
      login, 
      logout,
      markNotificationAsRead,
      addNotification
    }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error("useCustomerAuth must be used within a CustomerAuthProvider");
  }
  return context;
};
