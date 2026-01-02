// ... imports
import { supabase } from "@/lib/supabase";

// Inside your component...
const handleFileUpload = async (file: File, customerId: string) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${customerId}/${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage bucket named 'customer-documents'
    const { error: uploadError } = await supabase.storage
      .from("customer-documents") // Make sure you create this bucket in Supabase Dashboard
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data } = supabase.storage
      .from("customer-documents")
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error: any) {
    console.error("Error uploading file:", error.message);
    throw error;
  }
};
