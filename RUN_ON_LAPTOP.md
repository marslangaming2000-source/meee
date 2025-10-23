# Run Y2Tdown on Your Laptop - Step by Step

**Time needed: ~5 minutes**

---

## Step 1: Install yt-dlp (3 minutes)

### If you're on Windows:

**Option A (Easiest):**

```bash
choco install yt-dlp
```

If you don't have Chocolatey:

- Go to https://chocolatey.org/install
- Follow the installation (takes 5 minutes)
- Then run the command above

**Option B (If no Chocolatey):**

1. Install Python from https://www.python.org
2. Open Command Prompt
3. Run: `pip install yt-dlp`

**Test it works:**

```bash
yt-dlp --version
```

---

### If you're on macOS:

**Option A (Easiest):**

```bash
brew install yt-dlp
```

If you don't have Homebrew:

- Go to https://brew.sh
- Follow installation
- Then run the command above

**Option B (If no Homebrew):**

```bash
pip3 install yt-dlp
```

**Test it works:**

```bash
yt-dlp --version
```

---

### If you're on Linux:

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install yt-dlp
```

**Test it works:**

```bash
yt-dlp --version
```

---

## Step 2: Get the Code (1 minute)

If you don't have it already:

```bash
# Navigate to where you want to put the project
cd your/desired/folder

# Clone or download the project
# If you have git:
git clone <project-url>

# Otherwise download the zip and extract
```

---

## Step 3: Install Project Dependencies (1 minute)

Open your terminal/command prompt in the project folder:

```bash
pnpm install
```

Or if you don't have pnpm:

```bash
npm install
```

---

## Step 4: Run the App (30 seconds)

Still in the project folder, run:

```bash
pnpm dev
```

Or with npm:

```bash
npm run dev
```

You should see something like:

```
VITE v7.1.2  ready in 345 ms

➜  Local:   http://localhost:5173/
```

---

## Step 5: Open in Browser (30 seconds)

Click or copy-paste this into your browser:

```
http://localhost:5173
```

**You should see the Y2Tdown homepage!** 🎉

---

## Step 6: Test It Works (2 minutes)

1. Find a YouTube video you want to download
2. Copy the URL (from browser address bar)
3. Paste it into the Y2Tdown input field
4. Click **"Fetch Info"**
5. Choose a quality (720p is good)
6. Click **"Download Video"**
7. Your browser will download the video! ✅

---

## 🎯 That's It!

Your Y2Tdown video downloader is now running on your laptop!

### Where are the videos saved?

They're in your project folder:

```
your-project/downloads/
```

You can open this folder to see your downloaded videos.

---

## ⚠️ Keep These Running

Once you start, keep these windows open:

1. **Terminal/Command Prompt** - Where you ran `pnpm dev`
   - Don't close this - the app won't work
2. **Browser** - Your Y2Tdown app
   - The app runs in the browser

---

## 🛑 To Stop

Press `Ctrl+C` in the terminal where you ran `pnpm dev`

---

## ❓ Quick Troubleshooting

### "yt-dlp is not recognized"

- You didn't install yt-dlp or need to restart terminal
- Go back to Step 1 and try again

### "Failed to fetch video info"

- Video URL might be wrong
- Video might be private/deleted
- Try a different YouTube video first

### "Port 5173 already in use"

```bash
PORT=3000 pnpm dev
```

Then go to: `http://localhost:3000`

### "Module not found" error

- You forgot to run `pnpm install`
- Go back to Step 3

---

## 🎯 Quick Reference

| Step | Command                | Purpose                 |
| ---- | ---------------------- | ----------------------- |
| 1    | `yt-dlp --version`     | Verify yt-dlp installed |
| 2    | `git clone <url>`      | Get the code            |
| 3    | `pnpm install`         | Install dependencies    |
| 4    | `pnpm dev`             | Start the app           |
| 5    | Visit `localhost:5173` | Open in browser         |

---

## 📂 What You Have

After running, your folder looks like:

```
your-project/
├── downloads/              ← Downloaded videos go here
├── client/                 ← Frontend code (React)
├── server/                 ← Backend code (yt-dlp)
├── package.json
├── pnpm-lock.yaml
└── ... (other files)
```

---

## 🚀 You're Ready!

```bash
pnpm dev
```

→ Open `http://localhost:5173`

→ Paste a video URL

→ Download! 🎥

---

## Need More Help?

- **Quick questions?** See [QUICK_START.md](./QUICK_START.md)
- **Detailed setup?** See [SETUP_YTDLP_LOCAL.md](./SETUP_YTDLP_LOCAL.md)
- **How it works?** See [YTDLP_IMPLEMENTATION_SUMMARY.md](./YTDLP_IMPLEMENTATION_SUMMARY.md)

---

**Happy downloading!** 🎉
