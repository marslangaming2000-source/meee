# Y2Tdown - Local yt-dlp Setup Guide

This guide will help you set up the Y2Tdown video downloader to run on your laptop with yt-dlp backend.

## Prerequisites

You need to have:

- Node.js 18+ installed
- npm or pnpm
- yt-dlp installed on your system
- ~5GB free disk space (for downloaded videos)

---

## Step 1: Install yt-dlp

### Windows

**Option A: Using Chocolatey (Easiest)**

1. Install Chocolatey from https://chocolatey.org/install
2. Open Command Prompt as Administrator
3. Run:
   ```bash
   choco install yt-dlp
   ```

**Option B: Using Python pip**

1. Install Python from https://www.python.org (make sure to check "Add Python to PATH")
2. Open Command Prompt
3. Run:
   ```bash
   pip install yt-dlp
   ```

**Option C: Download Binary**

1. Go to https://github.com/yt-dlp/yt-dlp/releases
2. Download `yt-dlp.exe`
3. Place it in `C:\Program Files\yt-dlp\`
4. Add `C:\Program Files\yt-dlp\` to your System PATH:
   - Right-click "This PC" → Properties
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find "Path"
   - Click Edit and add `C:\Program Files\yt-dlp\`

**Verify installation:**

```bash
yt-dlp --version
```

---

### macOS

**Option A: Using Homebrew (Easiest)**

1. Install Homebrew from https://brew.sh
2. Open Terminal
3. Run:
   ```bash
   brew install yt-dlp
   ```

**Option B: Using Python pip**

```bash
pip3 install yt-dlp
```

**Verify installation:**

```bash
yt-dlp --version
```

---

### Linux (Ubuntu/Debian)

**Option A: Using apt**

```bash
sudo apt update
sudo apt install yt-dlp
```

**Option B: Using pip**

```bash
pip3 install yt-dlp
```

**Verify installation:**

```bash
yt-dlp --version
```

---

## Step 2: Clone/Setup Y2Tdown Project

1. Navigate to your project folder
2. Install dependencies:
   ```bash
   pnpm install
   ```
   Or with npm:
   ```bash
   npm install
   ```

---

## Step 3: Configure Environment Variables (Optional)

1. Create or edit `.env` file in the project root:

   ```bash
   cp .env.example .env
   ```

2. For local development, you can keep default values or customize:
   ```
   NODE_ENV=development
   PORT=8080
   ```

---

## Step 4: Run the Development Server

**The development server will automatically start both frontend AND backend together!**

```bash
pnpm dev
```

Or with npm:

```bash
npm run dev
```

You should see output like:

```
> fusion-starter@1.0.0 dev
> vite

VITE v7.1.2  ready in 345 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## Step 5: Access the Application

Open your browser and go to:

```
http://localhost:5173
```

or if prompted differently by Vite:

```
http://localhost:8080
```

---

## How the Backend Works

When you use the app:

1. **User enters URL** → Frontend sends to backend `/api/video/info`
2. **Backend calls yt-dlp** → yt-dlp extracts video metadata
3. **Backend returns options** → Quality/format choices shown to user
4. **User selects format** → Frontend sends to `/api/video/download`
5. **Backend calls yt-dlp again** → yt-dlp downloads the actual video file
6. **File saved locally** → In the `downloads/` folder in your project
7. **Browser downloads file** → User gets the video on their computer

---

## Folder Structure

After downloading videos, you'll see:

```
your-project/
├── downloads/              ← Downloaded videos stored here
│   ├── video_abc123.mp4
│   ├── video_def456.mp4
│   └── ...
├── client/
├── server/
├── dist/
└── package.json
```

---

## Features That Work Locally

✅ **YouTube** - Full support, all qualities
✅ **Instagram** - Posts, Reels, Stories
✅ **TikTok** - Videos with best quality
✅ **Facebook** - Videos and posts
✅ **Twitter/X** - Videos and media
✅ **Vimeo** - Videos
✅ **Any yt-dlp supported platform** - 1000+ websites!

---

## Troubleshooting

### Error: "yt-dlp is not recognized"

**Problem:** yt-dlp is not installed or not in PATH

**Solution:**

1. Check if installed:
   ```bash
   yt-dlp --version
   ```
2. If not found, install it (see Step 1 above)
3. Restart your terminal/command prompt
4. If still not working, add yt-dlp to PATH:
   - **Windows**: See Option C in Windows section above
   - **macOS/Linux**: Run `which yt-dlp` to verify it's installed

---

### Error: "Failed to fetch video info"

**Problem:** Backend failed to extract video metadata

**Possible causes:**

- URL is invalid or video is private/restricted
- yt-dlp is outdated
- Video source requires authentication
- Internet connection issue

**Solution:**

1. Update yt-dlp:
   ```bash
   yt-dlp --upgrade
   ```
2. Check if URL works directly:
   ```bash
   yt-dlp "https://your-url-here" --dump-json
   ```
3. Try a different public video first

---

### Error: "Port 8080 or 5173 already in use"

**Problem:** Another application is using the port

**Solution:**

**Windows:**

```bash
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**macOS/Linux:**

```bash
lsof -i :8080
kill -9 <PID>
```

Or just use a different port:

```bash
PORT=3000 pnpm dev
```

---

### Error: "ENOSPC: no space left on device"

**Problem:** Not enough disk space for downloads

**Solution:**

1. Delete old videos from `downloads/` folder
2. Check disk space:
   - **Windows**: Right-click drive → Properties
   - **macOS/Linux**: `df -h`
3. Free up space before downloading

---

### Error: "Download seems incomplete"

**Problem:** Video file is corrupted or incomplete

**Solution:**

1. Check file exists: Look in `downloads/` folder
2. Delete incomplete file
3. Try downloading again
4. Try a lower quality format

---

### Videos downloading very slowly

**Problem:** Slow internet or source limitations

**Solution:**

1. Check your internet speed
2. Try a lower quality (480p or 720p)
3. Try a different video first
4. Wait longer - large files take time
5. Some platforms intentionally throttle downloads

---

## Advanced Configuration

### Change Download Directory

Edit `server/services/ytdlpDownloader.ts`:

```typescript
// Change this line:
const DOWNLOAD_DIR = path.join(process.cwd(), "downloads");

// To something like:
const DOWNLOAD_DIR = "/path/to/your/videos/folder";
```

---

### Auto-delete Old Downloads

Files older than 24 hours are automatically deleted when the server starts. To change this:

Edit `server/index.ts` and add:

```typescript
// Clean up old downloads on startup (older than 7 days)
setInterval(
  () => {
    cleanupOldDownloads(7 * 24); // 7 days
  },
  60 * 60 * 1000,
); // Every hour
```

---

### Set Maximum Download Size

In `server/services/ytdlpDownloader.ts`, add a check in `downloadVideo()`:

```typescript
const MAX_SIZE_MB = 5000; // 5GB max
if (stats.size > MAX_SIZE_MB * 1024 * 1024) {
  throw new Error("File exceeds maximum allowed size");
}
```

---

## Building for Production

When you're ready to deploy to a real server:

```bash
pnpm build
```

This creates optimized production files in the `dist/` folder.

For production on your own server:

```bash
pnpm start
```

---

## Performance Tips

1. **Close other applications** while downloading large videos
2. **Use wired internet** instead of WiFi for better speed
3. **Download one video at a time** for best performance
4. **Select lower quality** for faster downloads
5. **Use MP4 format** - more compatible than others

---

## Security Notes

⚠️ **Important for Local Use:**

1. Downloaded videos are stored in your `downloads/` folder
2. Anyone with access to your computer can access these files
3. Only download videos you have rights to download
4. Some videos may be copyrighted - download responsibly
5. Respect platform terms of service

---

## Getting Help

### Check Server Logs

Look at your terminal where you ran `pnpm dev` for detailed error messages.

### Test yt-dlp Directly

```bash
# Get video info
yt-dlp -j "https://youtube.com/watch?v=VIDEO_ID"

# Download video
yt-dlp "https://youtube.com/watch?v=VIDEO_ID"

# Download in specific quality
yt-dlp -f "bestvideo[height<=720]+bestaudio/best" "https://youtube.com/watch?v=VIDEO_ID"
```

### Common yt-dlp Commands

```bash
# List all available formats
yt-dlp -F "https://video-url"

# Download with specific format
yt-dlp -f 18 "https://video-url"  # format ID 18

# Download with subtitles
yt-dlp --write-sub "https://video-url"

# Download playlist
yt-dlp "https://youtube.com/playlist?list=PLAYLIST_ID"

# Download in background with progress
yt-dlp --progress "https://video-url"
```

---

## Next Steps

1. ✅ Install yt-dlp (Step 1)
2. ✅ Set up the project (Step 2)
3. ✅ Run `pnpm dev` (Step 4)
4. ✅ Open browser to localhost (Step 5)
5. 🎉 Start downloading videos!

---

## System Requirements

| Component  | Minimum | Recommended |
| ---------- | ------- | ----------- |
| RAM        | 4GB     | 8GB+        |
| Disk Space | 5GB     | 20GB+       |
| Internet   | 10 Mbps | 50+ Mbps    |
| Node.js    | 18      | 20+ LTS     |
| yt-dlp     | Latest  | Latest      |

---

## Need Help?

- yt-dlp docs: https://github.com/yt-dlp/yt-dlp
- Node.js docs: https://nodejs.org/docs
- Project issues: Check the project repository
- Community: Ask on Stack Overflow or Reddit

**Happy downloading! 🎥**
