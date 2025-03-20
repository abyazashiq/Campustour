import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PanoramaViewer } from "@/components/panorama-viewer";
import { NavigationControls } from "@/components/navigation-controls";
import { BuildingInfo } from "@/components/building-info";
import { LocationMenu } from "@/components/location-menu";
import { DirectionArrow } from "@/components/direction-arrow";
import type { Location, NavigationPoint } from "@shared/schema";

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const queryClient = useQueryClient();

  const { data: locations = [] } = useQuery<Location[]>({
    queryKey: ["/api/locations"],
  });

  const { data: navigationPoints = [] } = useQuery<NavigationPoint[]>({
    queryKey: ["/api/locations", selectedLocation?.id, "navigation"],
    enabled: !!selectedLocation,
  });

  const handleRotateLeft = () => setRotation((r) => r - 45);
  const handleRotateRight = () => setRotation((r) => r + 45);
  const handleReset = () => setRotation(0);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setRotation(0);
  };

  const nextLocations = navigationPoints.map(point => {
    const nextLocation = locations.find(loc => loc.id === point.nextLocationId);
    return {
      ...point,
      nextLocation,
    };
  }).filter((point): point is typeof point & { nextLocation: Location } => point.nextLocation != null);

  if (!locations.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <LocationMenu 
        locations={locations} 
        onSelectLocation={handleLocationSelect}
      />

      <PanoramaViewer
        imageUrl={selectedLocation?.panoramaUrl || locations[0].panoramaUrl}
        rotation={rotation}
      />

      {nextLocations.map((point) => (
        <DirectionArrow
          key={point.id}
          direction={point.direction - rotation}
          distance={point.distance}
          locationName={point.nextLocation.name}
          onClick={() => handleLocationSelect(point.nextLocation)}
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