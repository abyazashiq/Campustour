import type { Location } from "@shared/schema";

export const SAMPLE_PANORAMAS = [
  "https://images.unsplash.com/photo-1533002832-1721d16b4bb9",
  "https://images.unsplash.com/photo-1624972137347-f7eef28f10e9",
  "https://images.unsplash.com/photo-1576495199011-eb94736d05d6",
  "https://images.unsplash.com/photo-1527891751199-7225231a68dd",
];

export const SAMPLE_BUILDINGS = [
  "https://images.unsplash.com/photo-1657869876659-74e21cd08651",
  "https://images.unsplash.com/photo-1657869876634-9562298c347a",
  "https://images.unsplash.com/photo-1472377723522-4768db9c41ce",
];

export function getNextPanorama(current: string): string {
  const index = SAMPLE_PANORAMAS.indexOf(current);
  return SAMPLE_PANORAMAS[(index + 1) % SAMPLE_PANORAMAS.length];
}

export async function fetchLocations(): Promise<Location[]> {
  const response = await fetch("/api/locations");
  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }
  return response.json();
}
