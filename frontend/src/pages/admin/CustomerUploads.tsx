import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const CustomerUploads: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage bucket named 'customer-documents'
      const { error: uploadError } = await supabase.storage
        .from("customer-documents")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      toast({
        title: "Upload Successful",
        description: "File has been uploaded securely.",
      });
    } catch (error: any) {
      console.error("Error uploading file:", error.message);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
        <div className="flex gap-4 items-center">
          <Input type="file" onChange={handleFileUpload} disabled={uploading} />
          <Button disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerUploads;
