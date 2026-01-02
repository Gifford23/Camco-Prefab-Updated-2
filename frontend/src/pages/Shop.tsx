import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ShopFilters from "@/components/shop/ShopFilters";
import ProductGrid, { Product } from "@/components/shop/ProductGrid";
import ShopPagination from "@/components/shop/ShopPagination";
import { categories as defaultCategories } from "@/data/products"; // Keep categories for filter list
import { Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Import Supabase

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]); // State for real products
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const productsPerPage = 6;

  // 1. Fetch Products from Supabase on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");

      if (error) throw error;

      // Map Supabase data to your Product interface
      const formattedProducts: Product[] = (data || []).map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image_url || "/placeholder.svg", // Handle mapping
        description: item.description,
        squareFeet: 0, // Default since it might not be in DB yet
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts = products.filter((product) => {
    // Filter by price range
    const inPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    // Filter by search query
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by selected categories
    const inSelectedCategories =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return inPriceRange && matchesSearch && inSelectedCategories;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFiltersChange = () => {
    setCurrentPage(1);
  };

  return (
    <Layout>
      {/* ... (Hero Section code remains exactly the same as your previous file) ... */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 text-white py-32 overflow-hidden">
        {/* Copy the Hero Section HTML from your previous file here */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6">
              Shop Real Database
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar filters */}
            <div className="animate-fade-in-left">
              <ShopFilters
                priceRange={priceRange}
                setPriceRange={(value) => {
                  setPriceRange(value);
                  handleFiltersChange();
                }}
                searchQuery={searchQuery}
                setSearchQuery={(value) => {
                  setSearchQuery(value);
                  handleFiltersChange();
                }}
                selectedCategories={selectedCategories}
                setSelectedCategories={(value) => {
                  setSelectedCategories(value);
                  handleFiltersChange();
                }}
                categories={defaultCategories}
              />
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-12">Loading products...</div>
              ) : (
                <ProductGrid products={currentProducts} />
              )}

              {!loading && filteredProducts.length > productsPerPage && (
                <div className="mt-8">
                  <ShopPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ... (Keep your custom <style> tag here) ... */}
    </Layout>
  );
};

export default Shop;
