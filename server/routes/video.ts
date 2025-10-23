import { RequestHandler } from "express";
import { getVideoInfo, downloadVideo } from "../services/videoDownloader";
import { z } from "zod";

// Validation schemas
const urlSchema = z.object({
  url: z.string().url("Invalid URL format"),
});

const downloadSchema = z.object({
  url: z.string().url("Invalid URL format"),
  quality: z.string(),
  extension: z.string(),
});

// Get video info endpoint
export const handleGetVideoInfo: RequestHandler = async (req, res) => {
  try {
    const { url } = urlSchema.parse(req.body);

    // Validate URL format
    if (!url) {
      res.status(400).json({
        success: false,
        error: "URL is required",
      });
      return;
    }

    // Get video information
    const videoInfo = await getVideoInfo(url);

    res.json({
      success: true,
      data: videoInfo,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: error.errors[0].message,
      });
      return;
    }

    const message = error instanceof Error ? error.message : "Failed to fetch video info";
    res.status(500).json({
      success: false,
      error: message,
    });
  }
};

// Download video endpoint
export const handleDownloadVideo: RequestHandler = async (req, res) => {
  try {
    const { url, quality, extension } = downloadSchema.parse(req.body);

    // Get download link
    const result = await downloadVideo(url, {
      quality,
      extension,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: error.errors[0].message,
      });
      return;
    }

    const message = error instanceof Error ? error.message : "Failed to download video";
    res.status(500).json({
      success: false,
      error: message,
    });
  }
};

// Health check endpoint
export const handleVideoHealth: RequestHandler = (req, res) => {
  res.json({
    success: true,
    message: "Video downloader service is running",
  });
};
