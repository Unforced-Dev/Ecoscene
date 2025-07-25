# GitHub Pages Deployment Guide

This guide explains how to deploy the ECOSCENE UI to GitHub Pages.

## Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment. Every push to the `main` branch will trigger a deployment.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **The deployment will happen automatically when you push to main**

3. **Access your deployed site at:**
   ```
   https://[your-username].github.io/Ecoscene/
   ```

## Manual Deployment

If you prefer to deploy manually from your local machine:

1. **Build the project:**
   ```bash
   cd ecoscene-ui
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## Configuration Details

The project is configured for GitHub Pages deployment with:

- **Base URL:** Set to `/Ecoscene/` in `vite.config.ts`
- **Routing:** Using HashRouter for better GitHub Pages compatibility
- **Build Output:** The build files are in the `dist` folder

## Troubleshooting

### 404 Errors
If you encounter 404 errors:
- Make sure GitHub Pages is enabled in your repository settings
- Verify the base URL matches your repository name
- The site uses hash routing (URLs will have `#` in them)

### Build Failures
If the build fails:
- Check the GitHub Actions tab for error logs
- Ensure all dependencies are properly listed in package.json
- Make sure TypeScript errors are resolved

### Blank Page
If you see a blank page:
- Check the browser console for errors
- Verify the base URL is correct in `vite.config.ts`
- Ensure you're accessing the correct URL with the repository name

## Local Testing

To test the production build locally:

```bash
cd ecoscene-ui
npm run build
npm run preview
```

This will serve the production build locally so you can verify everything works before deploying.