import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  MapPin, 
  Bell, 
  Eye, 
  Calendar, 
  DollarSign,
  MessageSquare,
  User,
  LogOut,
  ShoppingCart
} from "lucide-react";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import { getOrderStatusColor } from "@/data/orders";
import { products } from "@/data/products";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useOrderUpdates } from "@/context/OrderUpdatesContext";
import CustomerShoppingTab from "./CustomerShoppingTab";

const CustomerDashboard = () => {
  const { customer, logout } = useCustomerAuth();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { orders } = useOrderUpdates();
  const [activeTab, setActiveTab] = useState("orders");

  // Mock notifications data
  const notifications = [
    {
      id: "n1",
      orderId: "o1",
      message: "Your order #o1 has been delivered successfully!",
      type: "success",
      timestamp: "2023-04-15T11:30:00Z",
      read: false
    },
    {
      id: "n2",
      orderId: "o2",
      message: "Your order #o2 is now in production. Estimated completion: 2 weeks.",
      type: "info",
      timestamp: "2023-07-01T09:15:00Z",
      read: true
    },
    {
      id: "n3",
      orderId: "o3",
      message: "Your order #o3 is under review. We'll contact you soon.",
      type: "warning",
      timestamp: "2023-10-07T11:30:00Z",
      read: false
    }
  ];

  // Mock messages from admin
  const adminMessages = [
    {
      id: "m1",
      orderId: "o1",
      subject: "Installation Schedule Confirmation",
      message: "Dear customer, we're pleased to confirm your installation date for March 15th. Our team will arrive between 9 AM - 11 AM.",
      timestamp: "2023-04-10T14:30:00Z",
      read: true
    },
    {
      id: "m2",
      orderId: "o2",
      subject: "Production Update",
      message: "Your prefab unit is 60% complete. We're on schedule for delivery by August 20th. Photos of progress attached.",
      timestamp: "2023-07-01T09:15:00Z",
      read: false
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProductInfo = (productId: number) => {
    return products.find(p => p.id === productId);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = adminMessages.filter(m => !m.read).length;
  const cartItemsCount = getTotalItems();

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {customer?.firstName}!</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="shopping" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Shopping
            {cartItemsCount > 0 && (
              <Badge variant="default" className="ml-1 h-5 w-5 text-xs p-0 flex items-center justify-center bg-blue-600">
                {cartItemsCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
            {unreadNotifications > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                {unreadNotifications}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Messages
            {unreadMessages > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                {unreadMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold">
                      {orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status)).length}
                    </p>
                  </div>
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold">
                      {orders.filter(o => o.status === 'Delivered').length}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {orders.map((order) => {
              const product = getProductInfo(order.products[0]?.productId);
              return (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {product && (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">{product?.name}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getOrderStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <p className="text-lg font-semibold mt-1 flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {formatPrice(order.totalAmount)}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-2"
                          onClick={() => navigate(`/order-tracking/${order.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Track Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="shopping" className="space-y-6">
          <CustomerShoppingTab />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={!notification.read ? 'border-blue-200 bg-blue-50' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Bell className={`h-5 w-5 mt-0.5 ${!notification.read ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-gray-500">{formatDate(notification.timestamp)}</p>
                    </div>
                  </div>
                  {!notification.read && (
                    <Badge variant="default" className="bg-blue-600">New</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {adminMessages.map((message) => (
            <Card key={message.id} className={!message.read ? 'border-blue-200 bg-blue-50' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className={`h-5 w-5 mt-0.5 ${!message.read ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <h3 className="font-semibold">{message.subject}</h3>
                      <p className="text-sm text-gray-500">Order #{message.orderId}</p>
                    </div>
                  </div>
                  {!message.read && (
                    <Badge variant="default" className="bg-blue-600">New</Badge>
                  )}
                </div>
                <p className="text-gray-700 ml-8">{message.message}</p>
                <p className="text-xs text-gray-500 ml-8 mt-2">{formatDate(message.timestamp)}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">First Name</label>
                  <p className="text-lg">{customer?.firstName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Name</label>
                  <p className="text-lg">{customer?.lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg">{customer?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Customer ID</label>
                  <p className="text-lg">{customer?.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;
