import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, categories } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { X, Plus, FileText } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Define the product schema with Zod
const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  squareFeet: z.coerce.number().min(1, "Square feet must be at least 1"),
  image: z.string().url("Please enter a valid image URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  longDescription: z.string().optional(),
  leadTime: z.string().optional(),
  modelUrl: z.string().url("Please enter a valid 3D model URL").optional().or(z.literal("")),
  // Complex fields will be handled separately
  images: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  inclusion: z.array(z.string()).optional(),
  specifications: z.record(z.string()).optional()
});
export type ProductFormData = z.infer<typeof productSchema>;
interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}
const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel
}) => {
  const {
    toast
  } = useToast();
  const isEditMode = !!product;
  const [activeTab, setActiveTab] = useState("basic");

  // For dynamic fields
  const [features, setFeatures] = useState<string[]>(product?.features || []);
  const [newFeature, setNewFeature] = useState("");
  const [inclusions, setInclusions] = useState<string[]>(product?.inclusion || []);
  const [newInclusion, setNewInclusion] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>(product?.images || [product?.image || ""]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [specifications, setSpecifications] = useState<Record<string, string>>(product?.specifications || {});
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: product?.id,
      name: product?.name || "",
      price: product?.price || 0,
      category: product?.category || "",
      squareFeet: product?.squareFeet || 0,
      image: product?.image || "",
      description: product?.description || "",
      longDescription: product?.longDescription || "",
      leadTime: product?.leadTime || "",
      modelUrl: product?.modelUrl || "",
      images: product?.images || [],
      features: product?.features || [],
      inclusion: product?.inclusion || [],
      specifications: product?.specifications || {}
    }
  });
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const updatedFeatures = [...features, newFeature.trim()];
      setFeatures(updatedFeatures);
      form.setValue("features", updatedFeatures);
      setNewFeature("");
    }
  };
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    form.setValue("features", updatedFeatures);
  };
  const handleAddInclusion = () => {
    if (newInclusion.trim()) {
      const updatedInclusions = [...inclusions, newInclusion.trim()];
      setInclusions(updatedInclusions);
      form.setValue("inclusion", updatedInclusions);
      setNewInclusion("");
    }
  };
  const handleRemoveInclusion = (index: number) => {
    const updatedInclusions = inclusions.filter((_, i) => i !== index);
    setInclusions(updatedInclusions);
    form.setValue("inclusion", updatedInclusions);
  };
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      const updatedImages = [...imageUrls, newImageUrl.trim()];
      setImageUrls(updatedImages);
      form.setValue("images", updatedImages);
      // Also update the main image if it's the first image
      if (updatedImages.length === 1) {
        form.setValue("image", newImageUrl.trim());
      }
      setNewImageUrl("");
    }
  };
  const handleRemoveImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
    form.setValue("images", updatedImages);
    // Update the main image if we're removing the first image
    if (index === 0 && updatedImages.length > 0) {
      form.setValue("image", updatedImages[0]);
    }
  };
  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      const updatedSpecs = {
        ...specifications,
        [newSpecKey.trim()]: newSpecValue.trim()
      };
      setSpecifications(updatedSpecs);
      form.setValue("specifications", updatedSpecs);
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };
  const handleRemoveSpecification = (key: string) => {
    const {
      [key]: _,
      ...updatedSpecs
    } = specifications;
    setSpecifications(updatedSpecs);
    form.setValue("specifications", updatedSpecs);
  };
  const handleFormSubmit = (data: ProductFormData) => {
    // Ensure dynamic fields are included
    const completeData: ProductFormData = {
      ...data,
      features,
      inclusion: inclusions,
      images: imageUrls,
      specifications,
      // Make sure the main image is set to the first image if not already set
      image: data.image || (imageUrls.length > 0 ? imageUrls[0] : "")
    };
    try {
      onSubmit(completeData);
      toast({
        title: `Product ${isEditMode ? "updated" : "added"} successfully`,
        description: `"${data.name}" has been ${isEditMode ? "updated" : "added"} to the products list.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? "update" : "add"} product. Please try again.`,
        variant: "destructive"
      });
    }
  };
  return <div className="max-h-[80vh] overflow-y-auto px-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{isEditMode ? "Edit Product" : "Add New Product"}</h2>
        
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specs</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 mt-4">
            <TabsContent value="basic" className="space-y-4">
              <FormField control={form.control} name="name" render={({
              field
            }) => <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="price" render={({
                field
              }) => <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="category" render={({
                field
              }) => <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="squareFeet" render={({
                field
              }) => <FormItem>
                      <FormLabel>Square Feet</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="leadTime" render={({
                field
              }) => <FormItem>
                      <FormLabel>Lead Time</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 4-6 weeks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>

              <FormField control={form.control} name="modelUrl" render={({
              field
            }) => <FormItem>
                    <FormLabel>3D Model URL (Sketchfab)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://sketchfab.com/3d-models/..." {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      Paste the Sketchfab embed URL for the 3D model preview
                    </p>
                  </FormItem>} />

              <FormField control={form.control} name="description" render={({
              field
            }) => <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter a short product description" className="resize-none min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <FormField control={form.control} name="longDescription" render={({
              field
            }) => <FormItem>
                    <FormLabel>Long Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter a detailed product description" className="resize-none min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Product Images</h3>
                    <p className="text-sm text-muted-foreground">Add multiple images for the product. The first image will be used as the main image.</p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex gap-2">
                        <Input placeholder="Image URL" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} />
                        <Button type="button" variant="outline" onClick={handleAddImage}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {imageUrls.map((url, index) => <div key={index} className="relative group">
                          <div className="aspect-square border rounded-md overflow-hidden">
                            <img src={url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                          <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleRemoveImage(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                          {index === 0 && <span className="absolute bottom-2 left-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
                              Main
                            </span>}
                        </div>)}
                    </div>

                    <FormField control={form.control} name="image" render={({
                    field
                  }) => <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Product Features</h3>
                    <p className="text-sm text-muted-foreground">Add key features of the product, such as amenities and notable characteristics.</p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex gap-2">
                        <Input placeholder="Add a feature" value={newFeature} onChange={e => setNewFeature(e.target.value)} />
                        <Button type="button" variant="outline" onClick={handleAddFeature}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {features.map((feature, index) => <li key={index} className="flex justify-between items-center border-b pb-2">
                          <span>{feature}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveFeature(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </li>)}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Product Specifications</h3>
                    <p className="text-sm text-muted-foreground">Add technical specifications like dimensions, materials, etc.</p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Specification name" value={newSpecKey} onChange={e => setNewSpecKey(e.target.value)} />
                        <div className="flex gap-2">
                          <Input placeholder="Value" value={newSpecValue} onChange={e => setNewSpecValue(e.target.value)} />
                          <Button type="button" variant="outline" onClick={handleAddSpecification}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {Object.entries(specifications).map(([key, value], index) => <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <span className="font-medium capitalize">{key}: </span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveSpecification(key)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inclusions" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">What's Included</h3>
                    <p className="text-sm text-muted-foreground">List items that are included with the product purchase.</p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex gap-2">
                        <Input placeholder="Add an included item" value={newInclusion} onChange={e => setNewInclusion(e.target.value)} />
                        <Button type="button" variant="outline" onClick={handleAddInclusion}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {inclusions.map((inclusion, index) => <li key={index} className="flex justify-between items-center border-b pb-2">
                          <span>{inclusion}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveInclusion(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </li>)}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>;
};
export default ProductForm;