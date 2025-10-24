
import React from 'react';
import Layout from "@/components/Layout";
import CustomerDashboard from "@/components/customer/CustomerDashboard";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import CustomerLogin from "@/components/customer/CustomerLogin";

const CustomerDashboardPage = () => {
  try {
    const { isAuthenticated } = useCustomerAuth();

    if (!isAuthenticated) {
      return (
        <Layout>
          <div className="container py-12 max-w-md mx-auto">
            <CustomerLogin />
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <CustomerDashboard />
      </Layout>
    );
  } catch (error) {
    console.error('CustomerDashboard error:', error);
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </Layout>
    );
  }
};

export default CustomerDashboardPage;
