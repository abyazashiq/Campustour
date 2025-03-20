import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface NavigationControlsProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
  onNext: () => void;
}

export function NavigationControls({
  onRotateLeft,
  onRotateRight,
  onReset,
  onNext,
}: NavigationControlsProps) {
  return (
    <Card className="p-4 fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 bg-background/80 backdrop-blur">
      <Button variant="outline" size="icon" onClick={onRotateLeft}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onReset}>
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onRotateRight}>
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button onClick={onNext}>Next Location</Button>
    </Card>
  );
}
