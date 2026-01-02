import { useNavigate } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { formatPrice, usdToPhp } from "@/lib/formatters";
import { useCart } from "@/context/CartContext";
import { useCustomerAuth } from "@/context/CustomerAuthContext";

// Update Interface to match Supabase types
interface Product {
  id: string; // Changed to string
  name: string;
  price: number;
  category: string;
  squareFeet?: number; // Optional
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useCustomerAuth();

  const handleBuyNow = (productId: string) => {
    if (!isAuthenticated) {
      toast("Please login to continue with your purchase");
      navigate("/login");
      return;
    }

    navigate(`/product/${productId}`);
    toast("Redirecting to product detail page");
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast("Please login to add items to your cart");
      navigate("/login");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="default"
            className="bg-prefab-600 hover:bg-prefab-700 text-white"
            onClick={() => handleBuyNow(product.id)}
          >
            Buy Now
          </Button>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <span className="text-prefab-600 font-semibold">
            {formatPrice(usdToPhp(product.price))}
          </span>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-sm text-gray-500">
            {product.category} {product.squareFeet ? `· ${product.squareFeet} sq ft` : ''}
          </span>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-gray-600 text-sm line-clamp-3">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => handleViewDetails(product.id)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Details
          </Button>
          <Button
            className="bg-prefab-600 hover:bg-prefab-700 text-white flex items-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;