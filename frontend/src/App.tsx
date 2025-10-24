import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { CustomerAuthProvider } from "@/context/CustomerAuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { OrderUpdatesProvider } from "@/context/OrderUpdatesContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FAQ from "./pages/FAQ";
import Checkout from "./pages/Checkout";
import CustomerProfile from "./pages/CustomerProfile";
import CustomerDashboardPage from "./pages/CustomerDashboard";
import OrderHistory from "./pages/OrderHistory";
import OrderTracking from "./pages/OrderTracking";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Admin routes
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import AdminProjects from "./pages/admin/AdminProjects";
import Contracts from "./pages/admin/Contracts";
import ContractDetail from "./pages/admin/ContractDetail";
import Messages from "./pages/admin/Messages";
import CustomerUploads from "./pages/admin/CustomerUploads";
import ManagePersonnel from "./pages/admin/ManagePersonnel";
import RecordsUpload from "./pages/admin/RecordsUpload";
import ActivityLog from "./pages/admin/ActivityLog";

import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminLayout from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminAuthProvider>
            <CustomerAuthProvider>
              <OrderUpdatesProvider>
                <CartProvider>
                  <OrderProvider>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/project/:id" element={<ProjectDetail />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route
                        path="/reset-password"
                        element={<ResetPassword />}
                      />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/checkout/:id" element={<Checkout />} />
                      <Route
                        path="/customer-profile"
                        element={<CustomerProfile />}
                      />
                      <Route
                        path="/customer-dashboard"
                        element={<CustomerDashboardPage />}
                      />
                      <Route path="/order-history" element={<OrderHistory />} />
                      <Route
                        path="/order-tracking/:id"
                        element={<OrderTracking />}
                      />
                      <Route path="/admin-login" element={<AdminLogin />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                      {/* Admin routes - all wrapped with ProtectedAdminRoute + AdminLayout */}
                      <Route
                        path="/admin/*"
                        element={
                          <ProtectedAdminRoute
                            component={() => (
                              <AdminLayout>
                                <Routes>
                                  <Route
                                    path="dashboard"
                                    element={<Dashboard />}
                                  />
                                  <Route
                                    path="products"
                                    element={<Products />}
                                  />
                                  <Route path="orders" element={<Orders />} />
                                  <Route
                                    path="customers"
                                    element={<Customers />}
                                  />
                                  <Route path="reports" element={<Reports />} />
                                  <Route
                                    path="settings"
                                    element={<Settings />}
                                  />
                                  <Route
                                    path="projects"
                                    element={<AdminProjects />}
                                  />
                                  <Route
                                    path="contracts"
                                    element={<Contracts />}
                                  />
                                  <Route
                                    path="contracts/:contractId"
                                    element={<ContractDetail />}
                                  />
                                  <Route
                                    path="messages"
                                    element={<Messages />}
                                  />
                                  <Route
                                    path="customer-uploads"
                                    element={<CustomerUploads />}
                                  />
                                  <Route
                                    path="personnel"
                                    element={<ManagePersonnel />}
                                  />
                                  <Route
                                    path="records"
                                    element={<RecordsUpload />}
                                  />
                                  <Route
                                    path="activity"
                                    element={<ActivityLog />}
                                  />
                                </Routes>
                              </AdminLayout>
                            )}
                          />
                        }
                      />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </OrderProvider>
                </CartProvider>
              </OrderUpdatesProvider>
            </CustomerAuthProvider>
          </AdminAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
