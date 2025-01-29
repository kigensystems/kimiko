# Netlify Deployment Guide

## Pre-deployment Checklist

1. Environment Variables
   - None required for basic functionality
   - Optional: Consider making WebSocket URL configurable via `WEBSOCKET_URL` environment variable

2. Build Settings
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `netlify/functions`

3. Netlify Configuration
   - netlify.toml is already configured with proper settings
   - API redirects are set up correctly for serverless functions

## Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. In Netlify:
   - Create new site from Git
   - Connect to your repository
   - Select the branch to deploy (usually main/master)
   - Build settings will be automatically detected from netlify.toml
   - Deploy the site

3. After Deployment:
   - Verify all Netlify functions are working
   - Test the WebSocket connection
   - Verify IPFS proxy functionality
   - Test wallet connection
   - Check all navigation links

## Security Considerations

1. CORS Headers
   - Already configured in Netlify functions
   - Session function uses dynamic origin for better security
   - Other functions allow all origins (*) for API access

2. WebSocket Security
   - Using secure WebSocket connection (wss://)
   - No sensitive data transmitted

3. IPFS Proxy
   - Properly sanitizes input
   - Handles errors gracefully
   - No sensitive data exposed

4. Phantom Wallet Integration
   - Uses Netlify Blobs for secure session storage
   - Sessions are properly managed and cleaned up
   - CORS headers properly configured for wallet connections
   - No sensitive wallet data stored, only public keys

## Troubleshooting

If you encounter issues:

1. Check Netlify function logs for any errors
2. Verify WebSocket connection in browser console
3. Test IPFS proxy with a known working hash
4. Ensure all redirects are working properly

## Monitoring

Monitor your deployment using:
- Netlify Analytics (if enabled)
- Function execution logs
- Browser console for WebSocket/IPFS issues