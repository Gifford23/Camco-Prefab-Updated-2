import ProductCard from "./ProductCard";

export interface Product {
  id: string; // Changed from number to string for Supabase UUIDs
  name: string;
  price: number;
  category: string;
  squareFeet?: number; // Made optional
  image: string;
  description: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  // ... rest of the file stays the same
  return (
    <div className="lg:col-span-3">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-gray-600">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
