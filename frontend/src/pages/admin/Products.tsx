
import React, { useState } from 'react';
import { 
  Card, CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products as initialProducts, Product, categories } from '@/data/products';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProductForm, { ProductFormData } from '@/components/admin/ProductForm';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [viewMode, setViewMode] = useState(false);
  const { toast } = useToast();

  // Filter products based on search and category filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'All Categories' || 
      product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const uniqueCategories = ['All Categories', ...Array.from(new Set(products.map(product => product.category)))];
  
  const handleOpenAddProduct = () => {
    setCurrentProduct(undefined);
    setViewMode(false);
    setDialogOpen(true);
  };
  
  const handleOpenEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setViewMode(false);
    setDialogOpen(true);
  };
  
  const handleOpenViewProduct = (product: Product) => {
    setCurrentProduct(product);
    setViewMode(true);
    setDialogOpen(true);
  };
  
  const handleOpenDeleteDialog = (product: Product) => {
    setCurrentProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleSaveProduct = (formData: ProductFormData) => {
    if (currentProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === currentProduct.id ? { 
          ...formData, 
          id: currentProduct.id,
          name: formData.name || '',
          price: formData.price || 0,
          category: formData.category || 'Residential',
          squareFeet: formData.squareFeet || 0,
          image: formData.image || '',
          description: formData.description || '',
        } as Product : p
      );
      setProducts(updatedProducts);
      toast({
        title: "Product updated",
        description: `"${formData.name}" has been updated successfully.`,
      });
    } else {
      // Add new product
      const newProduct: Product = {
        ...formData,
        id: Math.max(0, ...products.map(p => p.id)) + 1,
        name: formData.name || '',
        price: formData.price || 0,
        category: formData.category || 'Residential',
        squareFeet: formData.squareFeet || 0,
        image: formData.image || '',
        description: formData.description || '',
      };
      setProducts([...products, newProduct]);
      toast({
        title: "Product added",
        description: `"${formData.name}" has been added successfully.`,
      });
    }
    setDialogOpen(false);
  };

  const handleDeleteProduct = () => {
    if (currentProduct) {
      setProducts(products.filter(p => p.id !== currentProduct.id));
      toast({
        title: "Product deleted",
        description: `"${currentProduct.name}" has been deleted.`,
      });
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenAddProduct}>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            {viewMode ? (
              <div className="max-h-[80vh] overflow-y-auto px-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Product Details</h2>
                  <Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)} className="rounded-full">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                
                {currentProduct && (
                  <div className="space-y-6">
                    <div className="aspect-video w-full overflow-hidden rounded-md">
                      <img 
                        src={currentProduct.image} 
                        alt={currentProduct.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{currentProduct.name}</h1>
                        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          {currentProduct.category}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">${currentProduct.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">{currentProduct.squareFeet} sq ft</span>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-semibold mb-2">Description</h3>
                        <p className="text-gray-700">{currentProduct.description}</p>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button onClick={() => setDialogOpen(false)}>Close</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ProductForm 
                product={currentProduct}
                onSubmit={handleSaveProduct}
                onCancel={() => setDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center gap-4">
        <Input 
          placeholder="Search products..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className="px-4 py-2 rounded-md border border-input"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold">${product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">{product.squareFeet} sq ft</span>
                </div>
                <div className="flex pt-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOpenEditProduct(product)}
                  >
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleOpenViewProduct(product)}
                  >
                    <Eye className="h-3 w-3 mr-1" /> View
                  </Button>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => handleOpenDeleteDialog(product)}
                >
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product "{currentProduct?.name}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={handleDeleteProduct}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Products;
