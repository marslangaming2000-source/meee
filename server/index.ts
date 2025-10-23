import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGetVideoInfo,
  handleDownloadVideo,
  handleVideoHealth,
} from "./routes/video";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Video downloader API routes
  app.get("/api/video/health", handleVideoHealth);
  app.post("/api/video/info", handleGetVideoInfo);
  app.post("/api/video/download", handleDownloadVideo);

  return app;
}
