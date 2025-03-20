import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(process.cwd(), 'uploads', 'panoramas');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  })
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

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

  app.post("/api/navigation", async (req, res) => {
    try {
      const point = await storage.createNavigationPoint(req.body);
      res.json(point);
    } catch (error) {
      res.status(400).json({ message: "Failed to create navigation point" });
    }
  });

  app.post("/api/locations/:id/panorama", upload.single('panorama'), async (req, res) => {
    try {
      const locationId = parseInt(req.params.id);
      const file = req.file;

      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const imageUrl = `/uploads/panoramas/${file.filename}`;
      const updatedLocation = await storage.updateLocationImage(locationId, imageUrl);

      res.json(updatedLocation);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload panorama" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}