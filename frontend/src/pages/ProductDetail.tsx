import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Box, Truck, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPrice, usdToPhp } from "@/lib/formatters";
import { useCustomerAuth } from "@/context/CustomerAuthContext";
import { toast } from "@/components/ui/sonner";

// Mock products data - this would come from an API in a real application
const products = [
  {
    id: 1,
    name: "Modern Studio Module",
    price: 39999,
    category: "Residential",
    squareFeet: 400,
    image:
      "https://camcoprefabricatedstructures.com/wp-content/uploads/2025/02/Mask-group-26.png",
    images: [
      "https://camcoprefabricatedstructures.com/wp-content/uploads/2025/02/Mask-group-26.png",
      "https://camcoprefabricatedstructures.com/wp-content/uploads/2025/02/Crispy-King-3-scaled.webp",
      "https://camcoprefabricatedstructures.com/wp-content/uploads/2025/02/Crispy-King-2-scaled.webp",
    ],
    description:
      "Perfect for a backyard office or guest house. Includes bathroom, kitchenette, and living space.",
    longDescription:
      "This modern studio module is designed with flexibility in mind. At 400 square feet, it's perfect for a backyard office, guest house, or rental unit. The module includes a full bathroom, kitchenette, and versatile living space that can be configured to your needs. High ceilings and large windows create an airy, open feeling despite the compact footprint.",
    features: [
      "Full bathroom",
      "Modern kitchenette",
      "Energy-efficient design",
      "Pre-wired for internet",
      "Customizable interior layout",
      "Quick installation",
    ],
    specifications: {
      dimensions: "20ft × 20ft",
      height: "9ft ceiling height",
      foundation: "Concrete pier or slab",
      structure: "Steel frame with insulated panels",
      roof: "Standing seam metal roof",
      windows: "Double-pane energy efficient",
      electrical: "100 amp service",
      plumbing: "Full hookups required",
    },
    inclusion: [
      "Free shipping within 100 miles",
      "Foundation preparation guide",
      "All necessary permits documentation",
      "Installation manual",
      "5-year structural warranty",
    ],
    leadTime: "4-6 weeks",
  },
  {
    id: 2,
    name: "Family Home Base Module",
    price: 89999,
    category: "Residential",
    squareFeet: 1200,
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "A spacious 3-bedroom family home with open concept living areas and modern finishes.",
    longDescription:
      "This family home base module offers 1,200 square feet of thoughtfully designed living space. With 3 bedrooms, 2 bathrooms, and open concept living areas, it's perfect for families. The modern design features high ceilings, large windows for natural light, and premium finishes throughout. The floor plan is optimized for comfortable family living while maintaining energy efficiency.",
    features: [
      "3 bedrooms",
      "2 bathrooms",
      "Open concept kitchen and living area",
      "Energy-efficient appliances",
      "Ample storage",
      "Modern finishes",
      "Customizable exterior",
    ],
    specifications: {
      dimensions: "40ft × 30ft",
      height: "9ft ceiling height",
      foundation: "Concrete slab required",
      structure: "Steel frame with insulated panels",
      roof: "Standing seam metal roof",
      windows: "Triple-pane energy efficient",
      electrical: "200 amp service",
      plumbing: "Full hookups required",
    },
    inclusion: [
      "Free shipping within 100 miles",
      "Foundation preparation guide",
      "All necessary permits documentation",
      "Installation coordination",
      "10-year structural warranty",
    ],
    leadTime: "8-10 weeks",
  },
  // ... sample products 3-6 from the Shop page
  {
    id: 3,
    name: "Commercial Office Pod",
    price: 45999,
    category: "Commercial",
    squareFeet: 600,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Open workspace for up to 8 employees. Modern design with plenty of natural light.",
    longDescription:
      "Designed for modern businesses, this commercial office pod provides 600 square feet of flexible workspace. Accommodating up to 8 employees comfortably, the open design promotes collaboration while maintaining efficiency. Large windows provide abundant natural light, and the module comes pre-wired for all modern office needs including high-speed internet and telecommunications infrastructure.",
    features: [
      "Open workspace for up to 8 people",
      "Conference area",
      "Kitchenette",
      "Bathroom",
      "Pre-wired for networking",
      "Sound dampening design",
      "Energy-efficient climate control",
    ],
    specifications: {
      dimensions: "30ft × 20ft",
      height: "9ft ceiling height",
      foundation: "Concrete slab or pier foundation",
      structure: "Steel frame with commercial-grade insulation",
      roof: "Flat membrane roof with proper drainage",
      windows: "Commercial-grade energy efficient",
      electrical: "200 amp service with multiple circuits",
      networking: "Cat6 pre-wiring throughout",
    },
    inclusion: [
      "Site assessment",
      "Delivery and installation",
      "Permits assistance",
      "Network setup guide",
      "7-year commercial warranty",
    ],
    leadTime: "6-8 weeks",
  },
  {
    id: 4,
    name: "Starter Home Module",
    price: 59999,
    category: "Residential",
    squareFeet: 800,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description:
      "Perfect starter home for couples or small families. 2 bedrooms, 1 bathroom with modern amenities.",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    longDescription:
      "The ideal first home, this 800 square foot module features 2 bedrooms, 1 bathroom, and an efficient open concept living area. Modern amenities and clever storage solutions make this compact space feel larger than its footprint. The versatile design allows for personalization to match your style and needs.",
    features: [
      "2 bedrooms",
      "1 bathroom",
      "Open concept living and dining",
      "Modern kitchen",
      "Energy-efficient appliances",
      "Ample storage solutions",
    ],
    specifications: {
      dimensions: "40ft × 20ft",
      height: "8.5ft ceiling height",
      foundation: "Concrete pier or slab",
      structure: "Steel frame with insulated panels",
      roof: "Standing seam metal roof",
      windows: "Double-pane energy efficient",
      electrical: "150 amp service",
      plumbing: "Full hookups required",
    },
    inclusion: [
      "Delivery within 150 miles",
      "Foundation requirements documentation",
      "Permits package",
      "Installation guide",
      "7-year structural warranty",
    ],
    leadTime: "5-7 weeks",
  },
  {
    id: 5,
    name: "Retail Store Module",
    price: 79999,
    category: "Commercial",
    squareFeet: 1000,
    image:
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Ready-to-use retail space with storefront, display areas, storage room and employee facilities.",
    longDescription:
      "Launch your retail business quickly with this turnkey 1,000 square foot retail module. Featuring an attractive storefront with large display windows, flexible interior space for merchandise display, back storage area, and employee facilities. The contemporary design and durable construction ensure your business makes a lasting impression while minimizing maintenance.",
    features: [
      "Large display windows",
      "Customizable retail floor",
      "Storage room",
      "Employee restroom",
      "Point-of-sale counter area",
      "Security features",
      "ADA compliant entry",
    ],
    specifications: {
      dimensions: "50ft × 20ft",
      height: "10ft ceiling height",
      foundation: "Commercial-grade concrete slab",
      structure: "Steel frame with commercial insulation",
      facade: "Customizable storefront",
      lighting: "LED commercial fixtures",
      electrical: "200 amp commercial service",
      security: "Pre-wired for alarm systems",
    },
    inclusion: [
      "Location assessment",
      "Delivery and professional installation",
      "Permits package",
      "Retail layout consultation",
      "10-year commercial warranty",
    ],
    leadTime: "8-12 weeks",
  },
  {
    id: 6,
    name: "Tiny Home Module",
    price: 29999,
    category: "Residential",
    squareFeet: 250,
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Compact living solution with ingenious space-saving features. Perfect for minimalist lifestyles.",
    longDescription:
      "Embrace minimalist living with our 250 square foot tiny home module. Every inch is thoughtfully designed with multi-functional furniture and clever storage solutions to maximize the space. Perfect for those looking to downsize, create a vacation retreat, or add an additional living space to an existing property. Despite its compact size, this module includes all essential amenities for comfortable living.",
    features: [
      "Multifunctional living space",
      "Space-saving bathroom",
      "Efficient kitchenette",
      "Clever storage throughout",
      "Optional loft sleeping area",
      "Energy-efficient design",
    ],
    specifications: {
      dimensions: "25ft × 10ft",
      height: "11ft peak height (allows for loft)",
      foundation: "Trailer chassis or pier foundation",
      structure: "Lightweight steel frame with high-R insulation",
      roof: "Metal roof with rainwater collection option",
      windows: "Double-pane energy efficient",
      electrical: "50 amp service",
      plumbing: "Standard or composting options",
    },
    inclusion: [
      "Free delivery within 100 miles",
      "Setup manual",
      "Permits guidance",
      "Tiny home living guide",
      "5-year structural warranty",
    ],
    leadTime: "3-5 weeks",
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useCustomerAuth();
  const [activeImage, setActiveImage] = useState(0);

  const productId = parseInt(id || "1");
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/shop")}>Return to Shop</Button>
        </div>
      </Layout>
    );
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast("Please login to continue with your purchase");
      navigate("/login");
      return;
    }

    navigate(`/checkout/${product.id}`);
  };

  return (
    <Layout>
      <div className="container py-8">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate("/shop")}
        >
          ← Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-80 md:h-96">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`h-20 rounded overflow-hidden border-2 ${
                    activeImage === index
                      ? "border-prefab-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center text-lg font-semibold text-prefab-600 mb-4">
              {formatPrice(usdToPhp(product.price))}
            </div>
            <div className="mb-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {product.category}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {product.squareFeet} sq ft
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.longDescription}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="bg-prefab-50">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Box className="h-8 w-8 text-prefab-600 mb-2" />
                  <CardDescription className="text-prefab-800">
                    {product.squareFeet} sq ft
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-prefab-50">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Truck className="h-8 w-8 text-prefab-600 mb-2" />
                  <CardDescription className="text-prefab-800">
                    {product.leadTime}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-prefab-50">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Package className="h-8 w-8 text-prefab-600 mb-2" />
                  <CardDescription className="text-prefab-800">
                    Complete Kit
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button
                className="w-full bg-prefab-600 hover:bg-prefab-700 text-white"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    View 3D Model
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>{product.name} - 3D Model</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                      Explore the 3D model of this product in detail
                    </DialogDescription>
                  </DialogHeader>
                  <div className="w-full h-full">
                    <div className="sketchfab-embed-wrapper h-full">
                      <iframe
                        title="Archicad Editable House Shipping Container UPD"
                        className="w-full h-[60vh] rounded-lg"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                        src="https://sketchfab.com/models/d5d494a3a9884101af20722be864028a/embed"
                      ></iframe>
                      <p className="text-xs font-normal mt-2 text-gray-600">
                        <a
                          href="https://sketchfab.com/3d-models/archicad-editable-house-shipping-container-upd-d5d494a3a9884101af20722be864028a?utm_medium=embed&utm_campaign=share-popup&utm_content=d5d494a3a9884101af20722be864028a"
                          target="_blank"
                          rel="nofollow"
                          className="font-bold text-prefab-600"
                        >
                          Archicad Editable House Shipping Container UPD
                        </a>{" "}
                        by
                        <a
                          href="https://sketchfab.com/architect47?utm_medium=embed&utm_campaign=share-popup&utm_content=d5d494a3a9884101af20722be864028a"
                          target="_blank"
                          rel="nofollow"
                          className="font-bold text-prefab-600"
                        >
                          VRA
                        </a>{" "}
                        on
                        <a
                          href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=d5d494a3a9884101af20722be864028a"
                          target="_blank"
                          rel="nofollow"
                          className="font-bold text-prefab-600"
                        >
                          Sketchfab
                        </a>
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="features">
            <TabsList className="w-full justify-start border-b mb-0 rounded-none">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="inclusion">What's Included</TabsTrigger>
              <TabsTrigger value="quote">Quotation</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="pt-6 px-1">
              <h3 className="text-xl font-medium mb-4">Key Features</h3>
              <ul className="list-disc ml-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="specifications" className="pt-6 px-1">
              <h3 className="text-xl font-medium mb-4">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <span className="font-medium capitalize">{key}: </span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inclusion" className="pt-6 px-1">
              <h3 className="text-xl font-medium mb-4">What's Included</h3>
              <ul className="list-disc ml-6 space-y-2">
                {product.inclusion.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="quote" className="pt-6 px-1">
              <h3 className="text-xl font-medium mb-4">Quotation Breakdown</h3>
              <div className="bg-gray-50 rounded-lg p-6 border mb-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Base Structure</span>
                    <span className="font-medium">
                      {formatPrice(product.price * 0.6)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interior Finishes</span>
                    <span className="font-medium">
                      {formatPrice(product.price * 0.25)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilities & Systems</span>
                    <span className="font-medium">
                      {formatPrice(product.price * 0.15)}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total Price</span>
                  <span>{formatPrice(product.price)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * This quotation is valid for 30 days and does not include
                  site preparation, foundation work, or shipping costs beyond
                  100 miles.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
