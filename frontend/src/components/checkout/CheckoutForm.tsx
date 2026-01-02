import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface CheckoutFormProps {
  product: {
    id: string; // Updated to string
    name: string;
    price: number;
    description: string;
    image: string; // Changed from imageUrl to match previous components
  };
}

interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const CheckoutForm = ({ product }: CheckoutFormProps) => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to place an order.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      // 2. Insert Order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          customer_name: `${orderData.firstName} ${orderData.lastName}`,
          customer_email: orderData.email,
          shipping_address: orderData.address,
          city: orderData.city,
          state: orderData.state,
          zip_code: orderData.zipCode,
          total_amount: product.price,
          status: "Pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 3. Insert Order Item
      const { error: itemError } = await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: product.id,
        quantity: 1,
        price_at_purchase: product.price,
      });

      if (itemError) throw itemError;

      // 4. Success!
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.id.slice(0, 8)} has been received.`,
      });

      // Navigate to success page or dashboard
      navigate(`/dashboard`);
    } catch (error: any) {
      console.error("Checkout Error:", error);
      toast({
        title: "Order Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-none border-0">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl text-gray-900">
          Shipping Details
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={orderData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={orderData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={orderData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={orderData.address}
              onChange={handleChange}
              required
              placeholder="123 Main St"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={orderData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                type="text"
                id="state"
                name="state"
                value={orderData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                type="text"
                id="zipCode"
                name="zipCode"
                value={orderData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg mt-6 bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : `Pay $${product.price.toLocaleString()}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
