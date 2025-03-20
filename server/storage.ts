import {
  type Location,
  type NavigationPoint,
  type InsertLocation,
  type InsertNavigationPoint,
} from "@shared/schema";

export interface IStorage {
  getAllLocations(): Promise<Location[]>;
  getLocation(id: number): Promise<Location | undefined>;
  getNavigationPoints(locationId: number): Promise<NavigationPoint[]>;
  createLocation(location: InsertLocation): Promise<Location>;
  createNavigationPoint(point: InsertNavigationPoint): Promise<NavigationPoint>;
  updateLocationImage(id: number, imageUrl: string): Promise<Location>;
}

export class MemStorage implements IStorage {
  private locations: Map<number, Location>;
  private navigationPoints: Map<number, NavigationPoint>;
  private currentLocationId: number;
  private currentNavigationPointId: number;

  constructor() {
    this.locations = new Map();
    this.navigationPoints = new Map();
    this.currentLocationId = 1;
    this.currentNavigationPointId = 1;
    this.initializeData();
  }

  private initializeData() {
    const sampleLocations: InsertLocation[] = [
      {
        name: "IT Department",
        description: "Information Technology Department Building",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7128, lng: -74.0060 },
        type: "building"
      },
      {
        name: "CSE Department",
        description: "Computer Science and Engineering Department",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7129, lng: -74.0061 },
        type: "building"
      },
      {
        name: "Library",
        description: "Central Library",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7130, lng: -74.0062 },
        type: "building"
      },
      {
        name: "ECE Department",
        description: "Electronics and Communication Engineering Department",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7131, lng: -74.0063 },
        type: "building"
      },
      {
        name: "Rishab's Food Court",
        description: "Popular campus food court",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7132, lng: -74.0064 },
        type: "food_court"
      },
      {
        name: "Fountain",
        description: "Central Campus Fountain",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7133, lng: -74.0065 },
        type: "landmark"
      },
      {
        name: "Clock Tower",
        description: "Iconic Campus Clock Tower",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7134, lng: -74.0066 },
        type: "landmark"
      },
      {
        name: "Main Auditorium",
        description: "Campus Main Auditorium",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7135, lng: -74.0067 },
        type: "building"
      },
      {
        name: "Entrance",
        description: "Main Campus Entrance",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7136, lng: -74.0068 },
        type: "landmark"
      },
      {
        name: "Main Canteen",
        description: "Main Campus Canteen",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7137, lng: -74.0069 },
        type: "food_court"
      },
      {
        name: "Ashwin's",
        description: "Ashwin's Food Court",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7138, lng: -74.0070 },
        type: "food_court"
      },
      {
        name: "Snow Cube",
        description: "Snow Cube Refreshments",
        panoramaUrl: "/panoramas/placeholder.jpg",
        position: { lat: 40.7139, lng: -74.0071 },
        type: "food_court"
      }
    ];

    sampleLocations.forEach(location => this.createLocation(location));
  }

  async getAllLocations(): Promise<Location[]> {
    return Array.from(this.locations.values());
  }

  async getLocation(id: number): Promise<Location | undefined> {
    return this.locations.get(id);
  }

  async getNavigationPoints(locationId: number): Promise<NavigationPoint[]> {
    return Array.from(this.navigationPoints.values()).filter(
      point => point.locationId === locationId
    );
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const id = this.currentLocationId++;
    const newLocation = { ...location, id };
    this.locations.set(id, newLocation);
    return newLocation;
  }

  async createNavigationPoint(point: InsertNavigationPoint): Promise<NavigationPoint> {
    const id = this.currentNavigationPointId++;
    const newPoint = { ...point, id };
    this.navigationPoints.set(id, newPoint);
    return newPoint;
  }

  async updateLocationImage(id: number, imageUrl: string): Promise<Location> {
    const location = await this.getLocation(id);
    if (!location) {
      throw new Error("Location not found");
    }
    const updatedLocation = { ...location, panoramaUrl: imageUrl };
    this.locations.set(id, updatedLocation);
    return updatedLocation;
  }
}

export const storage = new MemStorage();