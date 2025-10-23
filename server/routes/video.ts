import { RequestHandler } from "express";
import {
  getVideoInfo,
  downloadVideo,
  getDownloadedFiles,
  deleteDownloadedFile,
  DOWNLOAD_DIR,
} from "../services/ytdlpDownloader";
import { z } from "zod";
import * as path from "path";
import * as fs from "fs";

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

    if (!url) {
      res.status(400).json({
        success: false,
        error: "URL is required",
      });
      return;
    }

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

    const message =
      error instanceof Error ? error.message : "Failed to fetch video info";
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

    const result = await downloadVideo(url, quality, extension);

    res.json({
      success: true,
      data: {
        fileName: result.fileName,
        size: result.size,
        downloadUrl: `/api/video/file/${result.fileName}`,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: error.errors[0].message,
      });
      return;
    }

    const message =
      error instanceof Error ? error.message : "Failed to download video";
    res.status(500).json({
      success: false,
      error: message,
    });
  }
};

// Get downloaded file
export const handleGetFile: RequestHandler = (req, res) => {
  try {
    const { fileName } = req.params;

    if (!fileName) {
      res.status(400).json({
        success: false,
        error: "File name is required",
      });
      return;
    }

    // Security check - prevent directory traversal
    const safePath = path.resolve(
      path.join(DOWNLOAD_DIR, path.basename(fileName)),
    );
    const downloadDir = path.resolve(DOWNLOAD_DIR);

    if (!safePath.startsWith(downloadDir)) {
      res.status(403).json({
        success: false,
        error: "Access denied",
      });
      return;
    }

    if (!fs.existsSync(safePath)) {
      res.status(404).json({
        success: false,
        error: "File not found",
      });
      return;
    }

    res.download(safePath, fileName);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to download file";
    res.status(500).json({
      success: false,
      error: message,
    });
  }
};

// List all downloaded files
export const handleListDownloads: RequestHandler = (req, res) => {
  try {
    const files = getDownloadedFiles();

    res.json({
      success: true,
      data: files.map((file) => ({
        fileName: file.fileName,
        size: file.size,
        downloadUrl: `/api/video/file/${file.fileName}`,
        downloadedAt: new Date(file.downloadedAt).toISOString(),
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to list downloads";
    res.status(500).json({
      success: false,
      error: message,
    });
  }
};

// Delete a downloaded file
export const handleDeleteFile: RequestHandler = (req, res) => {
  try {
    const { fileName } = req.params;

    if (!fileName) {
      res.status(400).json({
        success: false,
        error: "File name is required",
      });
      return;
    }

    const deleted = deleteDownloadedFile(fileName);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: "File not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete file";
    res.status(500).json({
      success: false,
      error: message,
    });
  }
};

// Health check endpoint
export const handleVideoHealth: RequestHandler = (req, res) => {
  try {
    // Check if yt-dlp is installed
    const { execSync } = require("child_process");
    execSync("yt-dlp --version", { stdio: "ignore" });

    res.json({
      success: true,
      message: "Video downloader service is running",
      ytdlpInstalled: true,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Video downloader service is not available",
      ytdlpInstalled: false,
      error: "yt-dlp is not installed on the system",
    });
  }
};
