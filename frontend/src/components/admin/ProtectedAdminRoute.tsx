
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface ProtectedAdminRouteProps {
  component: React.ComponentType;
}

const ProtectedAdminRoute = ({ component: Component }: ProtectedAdminRouteProps) => {
  const isAuthenticated = sessionStorage.getItem("adminAuthenticated") === "true";
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to access the admin area",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, toast]);
  
  if (!isAuthenticated) {
    // Redirect to the login page but save the current location they were trying to access
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }
  
  return <Component />;
};

export default ProtectedAdminRoute;
