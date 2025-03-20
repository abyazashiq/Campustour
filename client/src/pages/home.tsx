import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PanoramaViewer } from "@/components/panorama-viewer";
import { NavigationControls } from "@/components/navigation-controls";
import { LocationMarker } from "@/components/location-marker";
import { BuildingInfo } from "@/components/building-info";
import { getNextPanorama, fetchLocations } from "@/lib/locations";
import type { Location } from "@shared/schema";

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const queryClient = useQueryClient();

  const { data: locations, isLoading } = useQuery({
    queryKey: ["/api/locations"],
  });

  const handleRotateLeft = () => setRotation((r) => r - 45);
  const handleRotateRight = () => setRotation((r) => r + 45);
  const handleReset = () => setRotation(0);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setRotation(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <PanoramaViewer
        imageUrl={selectedLocation?.panoramaUrl || locations?.[0]?.panoramaUrl}
        rotation={rotation}
      />

      {locations?.map((location: Location) => (
        <LocationMarker
          key={location.id}
          name={location.name}
          type={location.type}
          rotation={rotation}
          onClick={() => handleLocationSelect(location)}
        />
      ))}

      <NavigationControls
        onRotateLeft={handleRotateLeft}
        onRotateRight={handleRotateRight}
        onReset={handleReset}
        onNext={() => {
          const currentIndex = locations.findIndex(loc => loc.id === selectedLocation?.id);
          const nextLocation = locations[(currentIndex + 1) % locations.length];
          handleLocationSelect(nextLocation);
        }}
      />

      <BuildingInfo
        location={selectedLocation}
        open={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        onPanoramaUpdate={() => {
          queryClient.invalidateQueries({ queryKey: ['/api/locations'] });
        }}
      />
    </div>
  );
}