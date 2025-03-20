import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Location } from "@shared/schema";

export default function Admin() {
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [direction, setDirection] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: locations = [] } = useQuery({
    queryKey: ["/api/locations"],
  });

  const createNavigationPoint = useMutation({
    mutationFn: async (data: {
      locationId: number;
      nextLocationId: number;
      direction: number;
      distance: number;
    }) => {
      await apiRequest("POST", "/api/navigation", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
      toast({
        title: "Success",
        description: "Navigation point created",
      });
      // Reset form
      setFromLocation("");
      setToLocation("");
      setDirection("");
      setDistance("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create navigation point",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocation || !toLocation || !direction || !distance) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    createNavigationPoint.mutate({
      locationId: parseInt(fromLocation),
      nextLocationId: parseInt(toLocation),
      direction: parseFloat(direction),
      distance: parseFloat(distance),
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Navigation Points Management</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label>From Location</Label>
          <Select value={fromLocation} onValueChange={setFromLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location: Location) => (
                <SelectItem key={location.id} value={location.id.toString()}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>To Location</Label>
          <Select value={toLocation} onValueChange={setToLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location: Location) => (
                <SelectItem key={location.id} value={location.id.toString()}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Direction (degrees)</Label>
          <Input
            type="number"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            placeholder="Enter direction in degrees (0-360)"
            min="0"
            max="360"
          />
        </div>

        <div>
          <Label>Distance (meters)</Label>
          <Input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance in meters"
            min="0"
          />
        </div>

        <Button type="submit" disabled={createNavigationPoint.isPending}>
          {createNavigationPoint.isPending ? "Creating..." : "Create Navigation Point"}
        </Button>
      </form>
    </div>
  );
}
