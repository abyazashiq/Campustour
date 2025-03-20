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
        name: "Main Building",
        description: "The central administrative building",
        panoramaUrl: "https://images.unsplash.com/photo-1533002832-1721d16b4bb9",
        position: { lat: 40.7128, lng: -74.0060 },
        type: "building"
      },
      {
        name: "Science Complex",
        description: "Home to the science departments",
        panoramaUrl: "https://images.unsplash.com/photo-1624972137347-f7eef28f10e9",
        position: { lat: 40.7129, lng: -74.0061 },
        type: "building"
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
}

export const storage = new MemStorage();
