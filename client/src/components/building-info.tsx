import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Building } from "lucide-react";
import type { Location } from "@shared/schema";

interface BuildingInfoProps {
  location: Location | null;
  open: boolean;
  onClose: () => void;
}

export function BuildingInfo({ location, open, onClose }: BuildingInfoProps) {
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
      </SheetContent>
    </Sheet>
  );
}
