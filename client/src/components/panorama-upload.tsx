import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

interface PanoramaUploadProps {
  locationId: number;
  onSuccess?: () => void;
}

export function PanoramaUpload({ locationId, onSuccess }: PanoramaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('panorama', file);

    try {
      const response = await fetch(`/api/locations/${locationId}/panorama`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload panorama');
      }

      await queryClient.invalidateQueries({ queryKey: ['/api/locations'] });
      toast({
        title: "Success",
        description: "Panorama uploaded successfully",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload panorama",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        disabled={isUploading}
        className="hidden"
        id={`panorama-upload-${locationId}`}
      />
      <Button
        variant="outline"
        disabled={isUploading}
        onClick={() => document.getElementById(`panorama-upload-${locationId}`)?.click()}
      >
        <Upload className="h-4 w-4 mr-2" />
        {isUploading ? "Uploading..." : "Upload Panorama"}
      </Button>
    </div>
  );
}
