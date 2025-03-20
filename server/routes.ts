import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/locations", async (_req, res) => {
    const locations = await storage.getAllLocations();
    res.json(locations);
  });

  app.get("/api/locations/:id", async (req, res) => {
    const location = await storage.getLocation(parseInt(req.params.id));
    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return;
    }
    res.json(location);
  });

  app.get("/api/locations/:id/navigation", async (req, res) => {
    const points = await storage.getNavigationPoints(parseInt(req.params.id));
    res.json(points);
  });

  const httpServer = createServer(app);
  return httpServer;
}
