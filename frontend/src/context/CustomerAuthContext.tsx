import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
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

interface CustomerAuthContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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
  const { toast } = useToast();

  // 1. Listen for Auth Changes (Login/Logout)
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
      // User is logged in!
      // Try to get extra details from the 'profiles' table
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const firstName =
        user.user_metadata?.first_name || profile?.first_name || "User";
      const lastName =
        user.user_metadata?.last_name || profile?.last_name || "";

      setCustomer({
        id: user.id,
        email: user.email || null,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`.trim(),
        role: profile?.role || "customer",
      });
      setIsAuthenticated(true);
    } else {
      // User is logged out
      setCustomer(null);
      setIsAuthenticated(false);
    }
  };

  // 2. Login Function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Logout Function
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "See you next time!",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
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
