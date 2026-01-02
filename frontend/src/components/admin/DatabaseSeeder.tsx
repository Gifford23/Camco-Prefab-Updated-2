import { useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products"; // Importing your mock data
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const DatabaseSeeder = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const seedProducts = async () => {
    setLoading(true);
    try {
      // 1. Map your mock data to the database columns
      const productsToUpload = products.map((p) => ({
        name: p.name,
        description: p.description || "No description",
        price: p.price,
        category: p.category,
        image_url: p.image, // Assuming your mock data uses 'image'
        stock_quantity: 100, // Default stock
      }));

      // 2. Insert into Supabase
      const { error } = await supabase
        .from("products")
        .insert(productsToUpload);

      if (error) throw error;

      toast({
        title: "Success!",
        description: `${productsToUpload.length} products uploaded to Supabase.`,
      });
    } catch (error: any) {
      console.error("Seeding error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 my-4">
      <h3 className="font-bold mb-2">Developer Tools</h3>
      <Button onClick={seedProducts} disabled={loading}>
        {loading ? "Uploading..." : "Upload Mock Products to DB"}
      </Button>
    </div>
  );
};
