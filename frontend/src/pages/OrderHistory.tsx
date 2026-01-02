import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { formatPriceFromUSD } from "@/lib/formatters";

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  order_items: {
    quantity: number;
    products: {
      name: string;
      image_url: string;
    };
  }[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Fetch orders AND their related items + product details
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          id,
          created_at,
          total_amount,
          status,
          order_items (
            quantity,
            products (
              name,
              image_url
            )
          )
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-amber-600 bg-amber-50 border-amber-200"; // Pending
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_items.some((item) =>
        item.products?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <Layout>
      <div className="pt-24 pb-12 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/customer-dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by Order ID or Product Name..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center text-gray-500">
                Loading your orders...
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-sm text-gray-500">
                            #{order.id.slice(0, 8)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Ordered on{" "}
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-900">
                          {formatPriceFromUSD(order.total_amount)}
                        </div>
                        <Link to={`/order-tracking/${order.id}`}>
                          <Button
                            variant="link"
                            className="text-blue-600 p-0 h-auto font-medium"
                          >
                            View Order Details &rarr;
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="bg-gray-50/50 rounded-lg p-3">
                      {order.order_items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 py-2"
                        >
                          <div className="h-10 w-10 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                            {item.products?.image_url ? (
                              <img
                                src={item.products.image_url}
                                alt={item.products.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300" />
                            )}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">
                              {item.products?.name || "Unknown Product"}
                            </span>
                            <span className="text-gray-500 ml-2">
                              x{item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't placed any orders yet.
                </p>
                <Link to="/shop">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
