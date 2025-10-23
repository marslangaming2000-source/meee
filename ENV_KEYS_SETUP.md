# Y2Tdown - Environment Variables Quick Setup

## For Netlify Dashboard

Go to: **Site Settings** → **Build & Deploy** → **Environment** → **Edit variables**

### Minimum Setup (Optional - App Works Without These)

```
NODE_ENV = production
PING_MESSAGE = pong
```

---

## Optional: Enhanced Video Download APIs

### Option 1: RapidAPI (Easiest - No backend changes needed yet)

**Steps:**
1. Visit https://rapidapi.com
2. Sign up (free)
3. Search for: "video downloader" or "youtube downloader" API
4. Subscribe to one (most free)
5. Copy these to Netlify:

```
RAPIDAPI_KEY = YOUR_KEY_FROM_RAPIDAPI
RAPIDAPI_HOST = YOUR_HOST_FROM_API_DOCS
```

**Example values:**
```
RAPIDAPI_KEY = abc123def456ghi789
RAPIDAPI_HOST = youtube-yt-api.p.rapidapi.com
```

---

### Option 2: YouTube API (For YouTube enhancement)

**Steps:**
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable "YouTube Data API v3"
4. Create API Key (Credentials section)
5. Copy to Netlify:

```
YOUTUBE_API_KEY = YOUR_API_KEY
```

**Example:**
```
YOUTUBE_API_KEY = AIzaSyD1234567890abcdefghijklmnopqrstu
```

---

### Option 3: Custom Video API Service

If you have your own video downloader service:

```
VIDEO_API_ENDPOINT = https://api.yourservice.com
VIDEO_API_KEY = YOUR_API_KEY
```

---

## Cloud Storage (Optional - For video storage)

### AWS S3
```
AWS_ACCESS_KEY_ID = AKIA1234567890ABCDEF
AWS_SECRET_ACCESS_KEY = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_BUCKET_NAME = my-video-bucket
AWS_REGION = us-east-1
```

### Firebase
```
FIREBASE_API_KEY = AIzaSyD1234567890abcdefghijk
FIREBASE_PROJECT_ID = my-project-id
FIREBASE_STORAGE_BUCKET = my-project.appspot.com
```

---

## Database (Optional - For tracking downloads)

```
DATABASE_URL = postgresql://user:password@localhost:5432/y2tdown
```

---

## Feature Flags

```
ENABLE_PLAYLIST_DOWNLOAD = false
ENABLE_SUBTITLE_DOWNLOAD = true
MAX_DOWNLOAD_SIZE_MB = 5000
DOWNLOAD_TIMEOUT_SECONDS = 300
```

---

## How to Add to Netlify

1. Go to your Netlify site dashboard
2. Click **Site Settings** in top menu
3. Go to **Build & Deploy** → **Environment**
4. Click **Edit variables**
5. For each variable:
   - **Key**: Copy the left side (e.g., `RAPIDAPI_KEY`)
   - **Value**: Paste your actual value (e.g., `abc123def456`)
   - Click **Save**

---

## ⚠️ Important Notes

- **Do NOT commit .env files to Git** - Netlify provides these at runtime
- **API Keys are secrets** - Never share or commit them
- **Free tier usually works** - Most APIs have free plans for small use
- **Test locally first** - Copy keys to your local `.env` file and test before deploying

---

## No API Key? Just Deploy!

The app works without any environment variables. You'll have:
- ✅ Full UI functionality
- ✅ Platform detection
- ✅ Quality selection
- ✅ Dark mode
- ⚠️ Video downloads will show as "prepared" (not actual file download)

To enable actual downloads, add one of the API options above.

---

## Need Help Getting API Keys?

### Free YouTube API Key
- 1. Visit: https://console.cloud.google.com
- 2. Create project
- 3. Enable YouTube Data API v3
- 4. Create API key in Credentials
- 5. Copy and paste into Netlify

### Free RapidAPI Account
- 1. Visit: https://rapidapi.com
- 2. Sign up (free)
- 3. Search for video downloader API
- 4. Click "Subscribe to Test" (free tier)
- 5. View API details and copy credentials

### AWS S3 Bucket
- 1. Visit: https://aws.amazon.com
- 2. Create free account
- 3. Go to S3 and create bucket
- 4. Create IAM user with S3 access
- 5. Generate access keys

---

## Current API Endpoints (For Reference)

These are already set up in the code:

```
POST /api/video/info
- Input: { "url": "https://..." }
- Output: Video title, duration, thumbnail, available formats

POST /api/video/download  
- Input: { "url": "...", "quality": "1080p", "extension": "mp4" }
- Output: Download link and filename
```

---

## Support Links

- Netlify Docs: https://docs.netlify.com
- Netlify Environment Variables: https://docs.netlify.com/environment-variables/overview/
- RapidAPI: https://rapidapi.com
- Google Cloud: https://console.cloud.google.com
- AWS S3: https://aws.amazon.com/s3
- Firebase: https://firebase.google.com
