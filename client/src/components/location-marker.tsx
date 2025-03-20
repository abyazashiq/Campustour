import { Card } from "@/components/ui/card";
import { Building } from "lucide-react";

interface LocationMarkerProps {
  name: string;
  type: string;
  rotation: number;
  onClick: () => void;
}

export function LocationMarker({ name, type, rotation, onClick }: LocationMarkerProps) {
  const style = {
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  };

  return (
    <Card 
      className="fixed top-1/2 left-1/2 p-2 flex items-center gap-2 bg-background/80 backdrop-blur cursor-pointer hover:bg-background/90 transition-colors"
      style={style}
      onClick={onClick}
    >
      <Building className="h-4 w-4" />
      <span className="text-sm font-medium">{name}</span>
    </Card>
  );
}