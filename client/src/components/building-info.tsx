import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Building } from "lucide-react";
import type { Location } from "@shared/schema";
import { PanoramaUpload } from "./panorama-upload";

interface BuildingInfoProps {
  location: Location | null;
  open: boolean;
  onClose: () => void;
  onPanoramaUpdate?: () => void;
}

export function BuildingInfo({ location, open, onClose, onPanoramaUpdate }: BuildingInfoProps) {
  if (!location) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {location.name}
          </SheetTitle>
          <SheetDescription>
            {location.description}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Update Panorama</h3>
          <PanoramaUpload 
            locationId={location.id} 
            onSuccess={onPanoramaUpdate}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}