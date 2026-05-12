# The Strange Productions

A cinematic video archive web app for Strange Productions — built with React + Vite.

## Project Structure

```
strange-productions/
├── public/
│   ├── _redirects          # Netlify SPA routing
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   ├── SearchBar.jsx    # Reusable search input
│   │   ├── VideoCard.jsx    # Individual video thumbnail card
│   │   ├── VideoGrid.jsx    # Searchable grid of VideoCards
│   │   └── VideoModal.jsx   # Fullscreen video player modal
│   ├── hooks/
│   │   └── useVideoTitles.js  # Fetches titles via YouTube oEmbed API
│   ├── pages/
│   │   ├── AllMovies.jsx       # Landing page — full archive
│   │   ├── StrangeWanderer.jsx
│   │   ├── EarlyMovies.jsx
│   │   ├── RecentMovies.jsx
│   │   ├── GuyGuyWorld.jsx     # Links to YouTube channel
│   │   └── MaxBassett.jsx      # Links to maxbassettcreative.com
│   ├── data/
│   │   └── videos.js           # All YouTube URLs + helper functions
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Deploy to Netlify

1. Push this repo to GitHub
2. Log in to [netlify.com](https://netlify.com) and click **Add new site → Import from Git**
3. Select your repo
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

The `public/_redirects` file handles client-side routing automatically.

## Adding Videos

Edit `src/data/videos.js`:
- Add URLs to the appropriate array (`strangeWandererUrls`, `earlyMoviesUrls`, `recentMoviesUrls`)
- Video titles are fetched automatically via the YouTube oEmbed API
- The "All Movies" page automatically de-duplicates across sections

## Adding a Logo

Replace the `.navbar-logo` content in `Navbar.jsx` with an `<img>` tag pointing to your logo file placed in `public/`.

```jsx
// In Navbar.jsx, replace the logo-text div with:
<img src="/logo.png" alt="The Strange Productions" className="navbar-logo-img" />
```

Then add to `App.css`:
```css
.navbar-logo-img { height: 44px; width: auto; cursor: pointer; }
```
