import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PanoramaViewerProps {
  imageUrl: string;
  rotation: number;
  onLoad?: () => void;
}

export function PanoramaViewer({ imageUrl, rotation, onLoad }: PanoramaViewerProps) {
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    // Initialize A-Frame scene
    if (typeof window !== "undefined") {
      import("aframe").then(() => {
        if (sceneRef.current) {
          const camera = sceneRef.current.querySelector("[camera]");
          if (camera) {
            camera.setAttribute("rotation", `0 ${rotation} 0`);
          }
        }
      });
    }
  }, [rotation]);

  if (!imageUrl) {
    return <Skeleton className="w-full h-[600px] rounded-lg" />;
  }

  return (
    <Card className="w-full h-[600px] overflow-hidden rounded-lg">
      <a-scene
        ref={sceneRef}
        embedded
        loading-screen="enabled: false"
        vr-mode-ui="enabled: false"
      >
        <a-sky src={imageUrl} rotation="0 0 0" onLoad={onLoad} />
        <a-camera position="0 1.6 0" look-controls="enabled: true" />
      </a-scene>
    </Card>
  );
}
