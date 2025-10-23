import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

export interface VideoInfo {
  title: string;
  duration: number;
  thumbnail: string;
  author: string;
  platform: string;
  formats: VideoFormat[];
  videoId?: string;
}

export interface VideoFormat {
  quality: string;
  extension: string;
  size?: string;
  resolution?: string;
  formatId?: string;
}

const DOWNLOAD_DIR = path.join(process.cwd(), "downloads");

// Ensure downloads directory exists
function ensureDownloadDir() {
  if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
  }
}

// Detect platform from URL
function detectPlatform(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  } else if (url.includes("instagram.com")) {
    return "instagram";
  } else if (url.includes("tiktok.com")) {
    return "tiktok";
  } else if (url.includes("facebook.com")) {
    return "facebook";
  } else if (url.includes("twitter.com") || url.includes("x.com")) {
    return "twitter";
  } else if (url.includes("vimeo.com")) {
    return "vimeo";
  }
  return "unknown";
}

// Get video information using yt-dlp
export async function getVideoInfo(videoUrl: string): Promise<VideoInfo> {
  try {
    ensureDownloadDir();

    // Use yt-dlp to get video info in JSON format
    const command = `yt-dlp -j "${videoUrl}"`;
    const output = execSync(command, {
      encoding: "utf-8",
      maxBuffer: 50 * 1024 * 1024,
    });
    const videoData = JSON.parse(output);

    const platform = detectPlatform(videoUrl);
    const title = videoData.title || "Unknown Title";
    const duration = videoData.duration || 0;
    const thumbnail = videoData.thumbnail || "";
    const author = videoData.uploader || videoData.creator || "Unknown Author";

    // Extract available formats
    const formats: VideoFormat[] = [];
    const formatMap = new Map<string, VideoFormat>();

    if (videoData.formats && Array.isArray(videoData.formats)) {
      videoData.formats.forEach(
        (format: {
          format_id?: string;
          format?: string;
          ext?: string;
          format_note?: string;
          height?: number;
          width?: number;
          filesize?: number;
        }) => {
          if (format.ext && (format.ext === "mp4" || format.ext === "webm")) {
            const quality =
              format.format_note || `${format.height}p` || format.ext;
            const key = `${quality}-${format.ext}`;

            if (!formatMap.has(key)) {
              const sizeInMB = format.filesize
                ? (format.filesize / (1024 * 1024)).toFixed(2)
                : "Unknown";

              formatMap.set(key, {
                quality,
                extension: format.ext,
                size: `${sizeInMB} MB`,
                resolution: format.height
                  ? `${format.width}x${format.height}`
                  : undefined,
                formatId: format.format_id,
              });
            }
          }
        },
      );
    }

    // Add default formats if none found
    if (formatMap.size === 0) {
      formatMap.set("best-mp4", {
        quality: "Best",
        extension: "mp4",
      });
      formatMap.set("720p-mp4", {
        quality: "720p",
        extension: "mp4",
      });
      formatMap.set("480p-mp4", {
        quality: "480p",
        extension: "mp4",
      });
    }

    formats.push(...Array.from(formatMap.values()));

    return {
      title,
      duration,
      thumbnail,
      author,
      platform,
      formats,
      videoId: videoData.id,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch video info";
    throw new Error(`Failed to fetch video info: ${message}`);
  }
}

// Download video using yt-dlp
export async function downloadVideo(
  videoUrl: string,
  quality: string = "best",
  extension: string = "mp4",
): Promise<{ fileName: string; filePath: string; size: string }> {
  try {
    ensureDownloadDir();

    // Generate unique filename
    const uniqueId = uuidv4().slice(0, 8);
    const fileName = `video_${uniqueId}.${extension}`;
    const filePath = path.join(DOWNLOAD_DIR, fileName);

    // Build yt-dlp command
    let qualityFormat = "best";

    if (quality === "Best" || quality === "best") {
      qualityFormat = "best";
    } else if (quality.includes("1080")) {
      qualityFormat = "bestvideo[height<=1080]+bestaudio/best";
    } else if (quality.includes("720")) {
      qualityFormat = "bestvideo[height<=720]+bestaudio/best";
    } else if (quality.includes("480")) {
      qualityFormat = "bestvideo[height<=480]+bestaudio/best";
    } else if (quality.includes("360")) {
      qualityFormat = "bestvideo[height<=360]+bestaudio/best";
    }

    // Download video
    const command = `yt-dlp -f "${qualityFormat}" -o "${filePath}" "${videoUrl}"`;

    console.log(`Downloading video: ${videoUrl}`);
    console.log(`Quality: ${quality}, Format: ${extension}`);

    execSync(command, { maxBuffer: 50 * 1024 * 1024 });

    // Get file size
    const stats = fs.statSync(filePath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

    return {
      fileName,
      filePath,
      size: `${sizeInMB} MB`,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to download video";
    throw new Error(`Failed to download video: ${message}`);
  }
}

// Get list of all downloaded files
export function getDownloadedFiles(): Array<{
  fileName: string;
  size: string;
  downloadedAt: number;
}> {
  try {
    ensureDownloadDir();

    const files = fs.readdirSync(DOWNLOAD_DIR);
    return files
      .map((fileName) => {
        const filePath = path.join(DOWNLOAD_DIR, fileName);
        const stats = fs.statSync(filePath);
        return {
          fileName,
          size: `${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
          downloadedAt: stats.birthtime.getTime(),
        };
      })
      .sort((a, b) => b.downloadedAt - a.downloadedAt);
  } catch (error) {
    console.error("Error reading downloads:", error);
    return [];
  }
}

// Delete a downloaded file
export function deleteDownloadedFile(fileName: string): boolean {
  try {
    const filePath = path.join(DOWNLOAD_DIR, fileName);

    // Security check - ensure the file is in the downloads directory
    const resolvedPath = path.resolve(filePath);
    const resolvedDownloadDir = path.resolve(DOWNLOAD_DIR);

    if (!resolvedPath.startsWith(resolvedDownloadDir)) {
      throw new Error("Invalid file path");
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}

// Clean up old downloads (older than 24 hours)
export function cleanupOldDownloads(ageHours: number = 24): number {
  try {
    ensureDownloadDir();

    const files = fs.readdirSync(DOWNLOAD_DIR);
    let deletedCount = 0;
    const ageMs = ageHours * 60 * 60 * 1000;
    const now = Date.now();

    files.forEach((fileName) => {
      const filePath = path.join(DOWNLOAD_DIR, fileName);
      const stats = fs.statSync(filePath);
      const fileAge = now - stats.birthtime.getTime();

      if (fileAge > ageMs) {
        fs.unlinkSync(filePath);
        deletedCount++;
      }
    });

    console.log(`Cleaned up ${deletedCount} old download files`);
    return deletedCount;
  } catch (error) {
    console.error("Error cleaning up downloads:", error);
    return 0;
  }
}

export { DOWNLOAD_DIR };
