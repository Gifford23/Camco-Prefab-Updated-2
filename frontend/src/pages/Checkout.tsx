import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import MultiStepCheckout from "@/components/checkout/MultiStepCheckout";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

// Define the shape of our product for the checkout
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  squareFeet?: number;
  leadTime?: string;
}

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;

      if (data) {
        setProduct({
          id: data.id,
          name: data.name,
          price: data.price,
          category: data.category,
          image: data.image_url || "/placeholder.svg",
          description: data.description,
          squareFeet: 0, // Default value if column doesn't exist yet
          leadTime: "4-6 weeks",
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast({
        title: "Error",
        description: "Product not found or invalid ID.",
        variant: "destructive",
      });
      navigate("/shop");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return <Layout>{product && <MultiStepCheckout product={product} />}</Layout>;
};

export default Checkout;
