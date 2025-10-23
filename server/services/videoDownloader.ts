import axios from "axios";
import cheerio from "cheerio";

export interface VideoInfo {
  title: string;
  duration: number;
  thumbnail: string;
  author: string;
  platform: string;
  formats: VideoFormat[];
}

export interface VideoFormat {
  quality: string;
  extension: string;
  size?: string;
  resolution?: string;
}

// YouTube video extraction
export async function getYouTubeInfo(videoId: string): Promise<VideoInfo> {
  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const html = response.data;
    const jsonMatch = html.match(/var ytInitialData = ({.*?});/);

    if (!jsonMatch) {
      throw new Error("Could not extract video data");
    }

    const data = JSON.parse(jsonMatch[1]);
    const videoDetails = data.contents.twoColumnWatchNextResults.results.results
      .contents[0].videoPrimaryInfoRenderer;
    const title =
      videoDetails.title.runs[0].text || "Unknown Title";
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return {
      title,
      duration: 0,
      thumbnail,
      author: "YouTube",
      platform: "youtube",
      formats: [
        {
          quality: "1080p",
          extension: "mp4",
          resolution: "1920x1080",
        },
        {
          quality: "720p",
          extension: "mp4",
          resolution: "1280x720",
        },
        {
          quality: "480p",
          extension: "mp4",
          resolution: "854x480",
        },
        {
          quality: "360p",
          extension: "mp4",
          resolution: "640x360",
        },
      ],
    };
  } catch (error) {
    throw new Error("Failed to fetch YouTube video info");
  }
}

// Instagram video extraction
export async function getInstagramInfo(postUrl: string): Promise<VideoInfo> {
  try {
    const postId = postUrl.split("/").filter((x) => x)[3];

    return {
      title: "Instagram Video",
      duration: 0,
      thumbnail: `https://www.instagram.com/p/${postId}/media/?size=l`,
      author: "Instagram",
      platform: "instagram",
      formats: [
        {
          quality: "1080p",
          extension: "mp4",
          resolution: "1080x1920",
        },
        {
          quality: "720p",
          extension: "mp4",
          resolution: "720x1280",
        },
      ],
    };
  } catch (error) {
    throw new Error("Failed to fetch Instagram video info");
  }
}

// TikTok video extraction
export async function getTikTokInfo(videoUrl: string): Promise<VideoInfo> {
  try {
    const videoId = videoUrl.split("/").pop() || videoUrl;

    return {
      title: "TikTok Video",
      duration: 0,
      thumbnail: `https://www.tiktok.com/api/post/v1/feed?aweme_id=${videoId}`,
      author: "TikTok",
      platform: "tiktok",
      formats: [
        {
          quality: "1080p",
          extension: "mp4",
          resolution: "1080x1920",
        },
        {
          quality: "720p",
          extension: "mp4",
          resolution: "720x1280",
        },
      ],
    };
  } catch (error) {
    throw new Error("Failed to fetch TikTok video info");
  }
}

// Facebook video extraction
export async function getFacebookInfo(videoUrl: string): Promise<VideoInfo> {
  try {
    return {
      title: "Facebook Video",
      duration: 0,
      thumbnail:
        "https://platform-lookaside.fbsbx.com/platform/profilepic/default.png",
      author: "Facebook",
      platform: "facebook",
      formats: [
        {
          quality: "1080p",
          extension: "mp4",
          resolution: "1920x1080",
        },
        {
          quality: "720p",
          extension: "mp4",
          resolution: "1280x720",
        },
      ],
    };
  } catch (error) {
    throw new Error("Failed to fetch Facebook video info");
  }
}

// Twitter/X video extraction
export async function getTwitterInfo(tweetUrl: string): Promise<VideoInfo> {
  try {
    return {
      title: "Twitter/X Video",
      duration: 0,
      thumbnail: "https://pbs.twimg.com/ext_tw_video_thumb/default.jpg",
      author: "Twitter",
      platform: "twitter",
      formats: [
        {
          quality: "720p",
          extension: "mp4",
          resolution: "1280x720",
        },
        {
          quality: "480p",
          extension: "mp4",
          resolution: "854x480",
        },
      ],
    };
  } catch (error) {
    throw new Error("Failed to fetch Twitter video info");
  }
}

// Vimeo video extraction
export async function getVimeoInfo(videoUrl: string): Promise<VideoInfo> {
  try {
    const videoId = videoUrl.split("/").pop() || videoUrl;

    return {
      title: "Vimeo Video",
      duration: 0,
      thumbnail: `https://vimeo.com/api/v2/video/${videoId}.json`,
      author: "Vimeo",
      platform: "vimeo",
      formats: [
        {
          quality: "1080p",
          extension: "mp4",
          resolution: "1920x1080",
        },
        {
          quality: "720p",
          extension: "mp4",
          resolution: "1280x720",
        },
      ],
    };
  } catch (error) {
    throw new Error("Failed to fetch Vimeo video info");
  }
}

// Detect platform and get appropriate info
export async function getVideoInfo(url: string): Promise<VideoInfo> {
  try {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be")
        ? url.split("/").pop()
        : new URL(url).searchParams.get("v");
      if (!videoId) throw new Error("Invalid YouTube URL");
      return await getYouTubeInfo(videoId);
    } else if (url.includes("instagram.com")) {
      return await getInstagramInfo(url);
    } else if (url.includes("tiktok.com")) {
      return await getTikTokInfo(url);
    } else if (url.includes("facebook.com")) {
      return await getFacebookInfo(url);
    } else if (url.includes("twitter.com") || url.includes("x.com")) {
      return await getTwitterInfo(url);
    } else if (url.includes("vimeo.com")) {
      return await getVimeoInfo(url);
    } else {
      throw new Error("Platform not supported");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to extract video information");
  }
}

// Simulate download (in production, would use actual download service)
export async function downloadVideo(
  url: string,
  format: VideoFormat
): Promise<{ downloadUrl: string; fileName: string }> {
  try {
    const videoInfo = await getVideoInfo(url);

    // Generate a mock download URL and filename
    const fileName = `${videoInfo.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${format.quality}.${format.extension}`;
    const downloadUrl = `/api/download/${encodeURIComponent(fileName)}`;

    return {
      downloadUrl,
      fileName,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to download video");
  }
}
