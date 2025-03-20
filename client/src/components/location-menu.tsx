import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Building, MapPin, Coffee, Menu } from "lucide-react";
import type { Location } from "@shared/schema";

interface LocationMenuProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
}

export function LocationMenu({ locations, onSelectLocation }: LocationMenuProps) {
  const categorizedLocations = {
    building: locations.filter((loc) => loc.type === "building"),
    landmark: locations.filter((loc) => loc.type === "landmark"),
    food_court: locations.filter((loc) => loc.type === "food_court"),
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "building":
        return <Building className="h-4 w-4" />;
      case "landmark":
        return <MapPin className="h-4 w-4" />;
      case "food_court":
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const LocationCategory = ({ title, locations, type }: { title: string; locations: Location[]; type: string }) => (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        {getIcon(type)} {title}
      </h3>
      <div className="space-y-1">
        {locations.map((location) => (
          <Button
            key={location.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onSelectLocation(location)}
          >
            {location.name}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Campus Locations</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <LocationCategory
            title="Buildings"
            locations={categorizedLocations.building}
            type="building"
          />
          <LocationCategory
            title="Landmarks"
            locations={categorizedLocations.landmark}
            type="landmark"
          />
          <LocationCategory
            title="Food Courts"
            locations={categorizedLocations.food_court}
            type="food_court"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}