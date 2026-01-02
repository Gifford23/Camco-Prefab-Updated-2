import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  initializeNotificationHandler,
  cleanupNotificationHandler,
} from "@/utils/notificationHandler";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface Customer {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  displayName?: string | null;
  role?: string;
}

interface CustomerNotification {
  id: string;
  orderId: string;
  message: string;
  type:
    | "order_update"
    | "payment_confirmed"
    | "contract_ready"
    | "delivery_scheduled";
  timestamp: string;
  read: boolean;
  fromPersonnel?: string;
}

interface CustomerAuthContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  notifications: CustomerNotification[];
  unreadNotifications: number;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  markNotificationAsRead: (notificationId: string) => void;
  addNotification: (
    notification: Omit<CustomerNotification, "id" | "timestamp">
  ) => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(
  undefined
);

export const CustomerAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<CustomerNotification[]>(
    []
  );
  const { toast } = useToast();

  // Handle authentication state changes
  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSession = async (user: SupabaseUser | null) => {
    if (user) {
      // User is signed in
      // Fetch extra profile data from 'profiles' table
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const firstName =
        user.user_metadata?.first_name || profile?.first_name || "User";
      const lastName =
        user.user_metadata?.last_name || profile?.last_name || "";

      const customerData: Customer = {
        id: user.id,
        email: user.email || null,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`.trim(),
        role: profile?.role || "customer",
      };

      setCustomer(customerData);
      setIsAuthenticated(true);

      sessionStorage.setItem(
        "customerAuthenticated",
        JSON.stringify({
          id: user.id,
          email: user.email,
          firstName,
          lastName,
        })
      );
    } else {
      // User is signed out
      setCustomer(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("customerAuthenticated");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      initializeNotificationHandler(addNotification);
    } else {
      cleanupNotificationHandler();
    }
    return () => cleanupNotificationHandler();
  }, [isAuthenticated]);

  const addNotification = (
    notificationData: Omit<CustomerNotification, "id" | "timestamp">
  ) => {
    const newNotification: CustomerNotification = {
      ...notificationData,
      id: `n${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
    toast({
      title: "New Notification",
      description: notificationData.message,
    });
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Failed to log in.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out.",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    customer,
    isAuthenticated,
    isLoading,
    notifications,
    unreadNotifications,
    login,
    logout,
    markNotificationAsRead,
    addNotification,
  };

  return (
    <CustomerAuthContext.Provider value={value}>
      {!isLoading && children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error(
      "useCustomerAuth must be used within a CustomerAuthProvider"
    );
  }
  return context;
};

export default CustomerAuthContext;
