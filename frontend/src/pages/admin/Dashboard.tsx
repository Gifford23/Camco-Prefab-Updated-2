import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Package, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Revenue",
      value: "₱2,340,000",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Orders",
      value: "156",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Total Customers",
      value: "1,234",
      change: "+15.3%",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Products Sold",
      value: "2,891",
      change: "+23.1%",
      icon: Package,
      color: "text-orange-600"
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'products':
        navigate('/admin/products');
        break;
      case 'customers':
        navigate('/admin/customers');
        break;
      case 'orders':
        navigate('/admin/orders');
        break;
      case 'reports':
        navigate('/admin/reports');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          System Operational
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className={`text-xs ${stat.color} flex items-center gap-1 mt-1`}>
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">New order received</p>
                  <p className="text-sm text-gray-600">Order #ORD-2024-001</p>
                </div>
                <Badge variant="outline">New</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Product updated</p>
                  <p className="text-sm text-gray-600">Modern Container Home</p>
                </div>
                <Badge variant="outline">Updated</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Customer registered</p>
                  <p className="text-sm text-gray-600">john.doe@example.com</p>
                </div>
                <Badge variant="outline">New</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleQuickAction('products')}
                className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
              >
                <Package className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-blue-900">Add Product</p>
                <p className="text-sm text-blue-700">Create new product</p>
              </button>
              <button 
                onClick={() => handleQuickAction('customers')}
                className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors cursor-pointer"
              >
                <Users className="h-6 w-6 text-green-600 mb-2" />
                <p className="font-medium text-green-900">View Customers</p>
                <p className="text-sm text-green-700">Manage customers</p>
              </button>
              <button 
                onClick={() => handleQuickAction('orders')}
                className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer"
              >
                <ShoppingCart className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-purple-900">Orders</p>
                <p className="text-sm text-purple-700">Process orders</p>
              </button>
              <button 
                onClick={() => handleQuickAction('reports')}
                className="p-4 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors cursor-pointer"
              >
                <BarChart3 className="h-6 w-6 text-orange-600 mb-2" />
                <p className="font-medium text-orange-900">Reports</p>
                <p className="text-sm text-orange-700">View analytics</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;