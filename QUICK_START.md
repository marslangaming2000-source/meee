# Y2Tdown - Quick Start Guide

Get Y2Tdown running on your laptop in 5 minutes!

## 🚀 Quick Setup

### 1. Install yt-dlp

**Windows (Easiest):**
```bash
choco install yt-dlp
```

**macOS:**
```bash
brew install yt-dlp
```

**Linux:**
```bash
sudo apt install yt-dlp
```

**No package manager?** See [SETUP_YTDLP_LOCAL.md](./SETUP_YTDLP_LOCAL.md) for alternatives.

---

### 2. Verify Installation

```bash
yt-dlp --version
```

Should output something like: `2024.12.06`

---

### 3. Install Project Dependencies

```bash
pnpm install
```

Or with npm:
```bash
npm install
```

---

### 4. Start the App

```bash
pnpm dev
```

Vite will start and show:
```
VITE v7.1.2  ready in 345 ms
���  Local:   http://localhost:5173/
```

---

### 5. Open in Browser

Go to: `http://localhost:5173`

---

## 🎬 First Download

1. Paste a YouTube/Instagram/TikTok/etc URL
2. Click **"Fetch Info"**
3. Select quality (720p, 1080p, etc)
4. Click **"Download Video"**
5. Browser downloads the file automatically! ✅

---

## 📁 Where Are Downloads?

Your videos are saved in:
```
your-project-folder/downloads/
```

---

## ❓ Common Issues

### "yt-dlp is not recognized"
- Make sure you installed it (step 1)
- Restart your terminal

### "Failed to fetch video info"
- Check if URL is correct
- Update yt-dlp: `yt-dlp --upgrade`
- Try a different video first

### "Port already in use"
```bash
PORT=3000 pnpm dev
```

---

## 📖 Full Setup Guide

For detailed setup, troubleshooting, and advanced options:
→ See [SETUP_YTDLP_LOCAL.md](./SETUP_YTDLP_LOCAL.md)

---

## 🌍 Supported Platforms

- ✅ YouTube
- ✅ Instagram (Posts, Reels, Stories)
- ✅ TikTok
- ✅ Facebook
- ✅ Twitter/X
- ✅ Vimeo
- ✅ 1000+ other platforms (anything yt-dlp supports)

---

## 🎯 What Happens in Background

```
You enter URL
    ↓
Backend queries yt-dlp
    ↓
Shows available qualities
    ↓
You select quality
    ↓
yt-dlp downloads video
    ���
File saved to downloads/
    ↓
Browser downloads to your computer ✅
```

---

## 💡 Pro Tips

- Download at **720p** or **480p** for faster speeds
- **Lower quality** = faster download
- **Best quality** = takes longer
- Your internet speed matters!

---

## 🚀 Ready?

```bash
pnpm dev
```

Then open http://localhost:5173 and start downloading! 🎉

---

For more detailed information, see:
- [Complete Setup Guide](./SETUP_YTDLP_LOCAL.md)
- [Project Structure](./AGENTS.md)
