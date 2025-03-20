import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PanoramaViewer } from "@/components/panorama-viewer";
import { NavigationControls } from "@/components/navigation-controls";
import { LocationMarker } from "@/components/location-marker";
import { BuildingInfo } from "@/components/building-info";
import { getNextPanorama, fetchLocations } from "@/lib/locations";
import type { Location } from "@shared/schema";

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [currentPanorama, setCurrentPanorama] = useState(
    "https://images.unsplash.com/photo-1533002832-1721d16b4bb9"
  );
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const { data: locations, isLoading } = useQuery({
    queryKey: ["/api/locations"],
  });

  const handleRotateLeft = () => setRotation((r) => r - 45);
  const handleRotateRight = () => setRotation((r) => r + 45);
  const handleReset = () => setRotation(0);
  
  const handleNext = () => {
    setCurrentPanorama(getNextPanorama(currentPanorama));
    setRotation(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <PanoramaViewer
        imageUrl={currentPanorama}
        rotation={rotation}
      />
      
      {locations?.map((location: Location) => (
        <LocationMarker
          key={location.id}
          name={location.name}
          type={location.type}
          rotation={rotation}
          onClick={() => setSelectedLocation(location)}
        />
      ))}

      <NavigationControls
        onRotateLeft={handleRotateLeft}
        onRotateRight={handleRotateRight}
        onReset={handleReset}
        onNext={handleNext}
      />

      <BuildingInfo
        location={selectedLocation}
        open={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />
    </div>
  );
}
