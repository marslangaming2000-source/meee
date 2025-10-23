import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Download,
  Trash2,
  Eye,
  Share2,
  PlayCircle,
  FileVideo,
  Clock,
  HardDrive,
} from "lucide-react";
import { useState } from "react";

interface DownloadItem {
  id: string;
  title: string;
  platform: string;
  size: string;
  duration: string;
  date: string;
  thumbnail: string;
  quality: string;
  status: "completed" | "downloading" | "failed";
}

export default function Dashboard() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: "1",
      title: "Amazing Web Development Tutorial",
      platform: "YouTube",
      size: "520 MB",
      duration: "1:23:45",
      date: "Today",
      thumbnail:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=180&fit=crop",
      quality: "1080p",
      status: "completed",
    },
    {
      id: "2",
      title: "Creative Content Creation",
      platform: "Instagram",
      size: "85 MB",
      duration: "3:45",
      date: "Yesterday",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=300&h=180&fit=crop",
      quality: "720p",
      status: "completed",
    },
    {
      id: "3",
      title: "Trending Dance Challenge",
      platform: "TikTok",
      size: "45 MB",
      duration: "0:45",
      date: "2 days ago",
      thumbnail:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=180&fit=crop",
      quality: "480p",
      status: "completed",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const handleDelete = (id: string) => {
    setDownloads(downloads.filter((d) => d.id !== id));
  };

  const filteredDownloads =
    filter === "all"
      ? downloads
      : downloads.filter((d) => d.platform.toLowerCase() === filter);

  const totalSize = downloads.reduce((acc, d) => {
    const sizeNum = parseInt(d.size);
    const unit = d.size.split(" ")[1];
    const bytes =
      unit === "MB" ? sizeNum * 1024 * 1024 : sizeNum * 1024 * 1024 * 1024;
    return acc + bytes;
  }, 0);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Download <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-foreground/60 text-lg">
            Manage and track all your video downloads
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-2">
                  Total Downloads
                </p>
                <p className="text-3xl font-bold">{downloads.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                <Download className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-2">
                  Total Storage Used
                </p>
                <p className="text-3xl font-bold">{formatBytes(totalSize)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white">
                <HardDrive className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-2">Completed</p>
                <p className="text-3xl font-bold">
                  {downloads.filter((d) => d.status === "completed").length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                <PlayCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm mb-2">This Month</p>
                <p className="text-3xl font-bold">{downloads.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === "all"
                ? "gradient-button text-white"
                : "bg-card border border-border hover:border-primary/50"
            }`}
          >
            All
          </button>
          {["YouTube", "Instagram", "TikTok"].map((platform) => (
            <button
              key={platform}
              onClick={() => setFilter(platform.toLowerCase())}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === platform.toLowerCase()
                  ? "gradient-button text-white"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Downloads List */}
        <div className="space-y-4">
          {filteredDownloads.length > 0 ? (
            filteredDownloads.map((download) => (
              <div
                key={download.id}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  {/* Thumbnail */}
                  <div className="relative w-full md:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={download.thumbnail}
                      alt={download.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                          {download.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-foreground/60">
                          <span className="px-3 py-1 bg-primary/10 rounded-full text-primary font-medium">
                            {download.platform}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileVideo className="w-4 h-4" />
                            {download.quality}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {download.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <HardDrive className="w-4 h-4" />
                            {download.size}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/50">
                        {download.date}
                      </p>
                    </div>

                    {/* Status Bar */}
                    <div className="w-full bg-foreground/10 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-300"
                        style={{
                          width:
                            download.status === "completed" ? "100%" : "60%",
                        }}
                      ></div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-200 group/btn">
                        <Eye className="w-4 h-4 text-foreground/60 group-hover/btn:text-primary" />
                      </button>
                      <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-200 group/btn">
                        <Share2 className="w-4 h-4 text-foreground/60 group-hover/btn:text-primary" />
                      </button>
                      <button
                        onClick={() => handleDelete(download.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors duration-200 group/btn"
                      >
                        <Trash2 className="w-4 h-4 text-foreground/60 group-hover/btn:text-destructive" />
                      </button>
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button className="gradient-button px-6 py-2 text-white rounded-lg flex items-center gap-2 whitespace-nowrap">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <FileVideo className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No downloads yet</h3>
              <p className="text-foreground/60 mb-6">
                Start downloading videos to see them here
              </p>
              <a
                href="/"
                className="text-primary hover:text-secondary transition-colors"
              >
                Go to homepage →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
