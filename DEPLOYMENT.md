# Y2Tdown - Deployment Guide

## Overview

Y2Tdown is a modern video downloader website built with:
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Deployment**: Netlify with serverless functions

## Local Development

### Prerequisites
- Node.js 18+ 
- pnpm (preferred) or npm
- Git

### Setup

1. **Clone and install dependencies**
   ```bash
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

The app will be available at `http://localhost:8080`

## Deployment to Netlify

### Method 1: Using Netlify CLI (Recommended)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Build the project**
   ```bash
   pnpm build
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Method 2: Using Git Integration (GitHub, GitLab, Bitbucket)

1. Push your repository to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist/spa`
5. Add environment variables in Netlify dashboard

## Environment Variables for Netlify

### Required Variables (Minimum Setup)

No strict requirements - the app works with default settings.

### Optional Variables for Enhanced Features

Copy and add these to your Netlify Site Settings → Build & Deploy → Environment:

#### **Basic Configuration**
```
NODE_ENV=production
PORT=8080
PING_MESSAGE=pong
```

#### **YouTube Support (Optional)**
To enhance YouTube video detection and info:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable YouTube Data API v3
4. Create an API key
5. Add to Netlify:
```
YOUTUBE_API_KEY=your_youtube_api_key_here
```

#### **External Video Download APIs (Optional)**

**Option A: Using RapidAPI (Recommended for easy setup)**

1. Sign up at [RapidAPI](https://rapidapi.com)
2. Search for a video download API (e.g., "video downloader" or "youtube downloader")
3. Subscribe to the API
4. Get your API credentials from the API's documentation
5. Add to Netlify:
```
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=api-endpoint-name.p.rapidapi.com
```

**Option B: Using Custom Video Processing API**

If you have your own video processing service:
```
VIDEO_API_ENDPOINT=https://api.example.com
VIDEO_API_KEY=your_api_key_here
```

#### **Cloud Storage (Optional)**

**AWS S3 (for storing downloaded videos)**
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=us-east-1
```

**Firebase Storage**
```
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
```

#### **Database (Optional - for tracking downloads)**
```
DATABASE_URL=postgresql://user:password@host:port/database
```

#### **Feature Configuration**
```
ENABLE_PLAYLIST_DOWNLOAD=false
ENABLE_SUBTITLE_DOWNLOAD=true
MAX_DOWNLOAD_SIZE_MB=5000
DOWNLOAD_TIMEOUT_SECONDS=300
```

## How to Add Environment Variables in Netlify

### Via Netlify Dashboard

1. Go to your Netlify site
2. Navigate to **Site Settings** → **Build & Deploy** → **Environment**
3. Click **Edit variables**
4. Add each variable:
   - Key: (variable name from above)
   - Value: (your value)
5. Click **Save**

### Via Netlify CLI

```bash
netlify env:set KEY value
netlify env:set YOUTUBE_API_KEY your_key_here
netlify env:set RAPIDAPI_KEY your_key_here
netlify env:set RAPIDAPI_HOST your_host_here
```

## API Endpoints

The backend provides the following endpoints:

### Health Check
```
GET /api/video/health
```

### Get Video Information
```
POST /api/video/info
Body: { "url": "https://youtube.com/watch?v=..." }
Response: { "success": true, "data": { ... } }
```

### Download Video
```
POST /api/video/download
Body: { "url": "...", "quality": "1080p", "extension": "mp4" }
Response: { "success": true, "data": { "downloadUrl": "...", "fileName": "..." } }
```

## Supported Platforms

The backend automatically detects and handles:
- ✅ YouTube
- ✅ Instagram
- ✅ TikTok
- ✅ Facebook
- ✅ Twitter (X)
- ✅ Vimeo
- ✅ Other platforms (via plugin system)

## Features

### Current Features (V1)
- ✅ Modern, responsive UI with dark/light mode
- ✅ Multi-platform support detection
- ✅ Quality/format selection
- ✅ Video preview before download
- ✅ Download history tracking
- ✅ Dashboard with download management
- ✅ Mobile-optimized design

### Future Features (V2+)
- 🔄 Batch download support
- 🔄 Playlist support
- 🔄 Subtitle extraction
- 🔄 Format conversion
- 🔄 Advanced scheduling
- 🔄 User accounts & cloud sync

## Troubleshooting

### Build Fails on Netlify

**Error**: `Module not found`
- **Solution**: Make sure all dependencies are in `package.json`
- Run locally: `pnpm install && pnpm build`

### Downloads Not Working

**Error**: `API endpoint not found`
- **Solution**: Check that serverless functions are properly configured
- Run: `netlify functions:list`

**Error**: `Platform not supported`
- **Solution**: Check if the URL is from a supported platform
- Verify the platform is in the video downloader service

### Dark Mode Not Working

- **Solution**: Clear browser cache
- Check that JavaScript is enabled
- The dark mode toggle is in the header

## Performance Optimization

Current optimizations:
- ✅ Code splitting with Vite
- ✅ Image optimization
- ✅ Lazy loading
- ✅ CSS-in-JS with Tailwind
- ✅ Async API calls

## Security Notes

1. **Never commit environment variables** - Always use Netlify's environment variables panel
2. **API Keys are sensitive** - Use Read-only keys where possible
3. **HTTPS enforced** - Netlify automatically uses HTTPS
4. **CORS configured** - Allow specific origins only in production

## Support

For issues or questions:
1. Check the logs: `netlify logs` (if using CLI)
2. Review Netlify documentation: https://docs.netlify.com
3. Check the repository issues
4. Contact support via Netlify dashboard

## License

MIT License - see LICENSE file for details
