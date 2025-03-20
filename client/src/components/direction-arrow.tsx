import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NavigationPoint } from "@shared/schema";

interface DirectionArrowProps {
  direction: number; // angle in degrees
  distance: number; // distance in meters
  locationName: string;
  onClick: () => void;
}

export function DirectionArrow({ direction, distance, locationName, onClick }: DirectionArrowProps) {
  const style = {
    transform: `translate(-50%, -50%) rotate(${direction}deg)`,
    position: 'absolute',
    top: '50%',
    left: '50%',
  } as const;

  return (
    <div style={style} className="pointer-events-none">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onClick}
        className="bg-background/80 backdrop-blur pointer-events-auto flex items-center gap-2 hover:bg-background/90 transition-colors"
      >
        <ArrowRight className="h-4 w-4" />
        <span className="text-sm">{locationName} ({Math.round(distance)}m)</span>
      </Button>
    </div>
  );
}
