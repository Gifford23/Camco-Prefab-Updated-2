import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string; // Updated to string for Supabase UUID
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock_quantity: number;
  longDescription?: string;
  features?: string[];
  specifications?: Record<string, string>;
  inclusion?: string[];
  leadTime?: string;
  images?: string[];
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;

      if (data) {
        // Map database fields to frontend structure
        const mappedProduct: Product = {
          id: data.id,
          name: data.name,
          price: data.price,
          category: data.category,
          image: data.image_url || "/placeholder.svg",
          description: data.description,
          stock_quantity: data.stock_quantity || 0,
          // Fill in optional details with defaults or real data if you expand your DB later
          longDescription: data.description,
          leadTime: "3-5 Weeks",
          features: ["Premium Materials", "Eco-Friendly", "Quick Installation"],
          images: [data.image_url || "/placeholder.svg"],
        };

        setProduct(mappedProduct);
        setSelectedImage(mappedProduct.image);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast({
        title: "Error",
        description: "Could not load product details.",
        variant: "destructive",
      });
      navigate("/shop");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (
      type === "increment" &&
      product &&
      quantity < product.stock_quantity
    ) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Convert string ID to number if your CartContext absolutely requires numbers,
    // BUT ideally you should update CartContext to accept strings.
    // For now, we will pass the product as is and assume CartContext needs to be fixed next.
    addToCart(product as any, quantity); // 'as any' is a temporary fix

    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!product) return null;

  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          {/* Back Button */}
          <Link to="/shop">
            <Button variant="ghost" className="mb-8 hover:bg-white/50">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Add to Cart Section */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Quantity</span>
                  <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange("decrement")}
                      disabled={quantity <= 1}
                      className="h-8 w-8 rounded-md"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-medium w-8 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange("increment")}
                      disabled={quantity >= product.stock_quantity}
                      className="h-8 w-8 rounded-md"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full h-12 text-lg"
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-blue-500" />
                    <span>Nationwide Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
