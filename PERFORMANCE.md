# Performance Optimization Guide

## Current Optimizations ✅

### CSS Variables Optimization

- **Reduced from 20+ to 13 variables** (35% reduction)
- Consolidated similar colors:
  - `--navbar-text`, `--input-border`, `--input-focus` → use `--text`, `--blue`, `--card-border`
  - `--services-bg`, `--testimonials-bg` → use `--hero-bg`
- CSS variables have **negligible performance impact** (<1ms parse time)

### Current File Structure

- ✅ Single HTML file (no additional HTTP requests)
- ✅ Inline CSS (no CSS file request)
- ✅ Inline JavaScript (no JS file request)
- ✅ Local fonts (no external font requests)

---

## Recommended Optimizations (McMaster.com Style)

### 1. **Image Optimization** 🎯 HIGH IMPACT

```bash
# Convert images to WebP format (60-80% smaller)
# Use responsive images with srcset
# Lazy load images below the fold
```

**Action Items:**

- Convert all PNG/JPG to WebP format
- Add lazy loading: `<img loading="lazy" ...>`
- Use `srcset` for responsive images
- Consider SVG sprites for icons

### 2. **Critical CSS Inlining** 🎯 HIGH IMPACT

Your CSS is already inline, but we can optimize:

- Extract above-the-fold CSS (first 600px)
- Defer non-critical CSS
- Minify CSS (remove comments, whitespace)

**Tools:**

- `cssnano` for minification
- Critical CSS extraction tools

### 3. **Font Loading Optimization** 🎯 MEDIUM IMPACT

```css
/* Add to existing @font-face */
font-display: swap; /* Already implemented ✅ */
```

**Action Items:**

- Preload critical fonts:
  ```html
  <link
    rel="preload"
    href="fonts/BAUHS93.ttf"
    as="font"
    type="font/ttf"
    crossorigin
  />
  ```
- Consider variable fonts (single file for all weights)
- Subset fonts (only include used characters)

### 4. **Resource Hints** 🎯 MEDIUM IMPACT

```html
<head>
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://wa.me" />
  <link rel="dns-prefetch" href="https://wa.me" />

  <!-- Preload critical assets -->
  <link rel="preload" href="images/logo-navbar-default.svg" as="image" />
  <link rel="preload" href="images/banner-cmyk.svg" as="image" />
</head>
```

### 5. **JavaScript Optimization** 🎯 LOW IMPACT

Your JS is minimal and efficient!

**Additional improvements:**

- Add `defer` if externalized: `<script defer src="script.js"></script>`
- Use Intersection Observer for scroll events (already efficient)
- Consider removing jQuery if not needed (you don't use it ✅)

### 6. **Caching Strategy** 🎯 HIGH IMPACT

Add to your server config or `.htaccess`:

```apache
# .htaccess (Apache)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
```

### 7. **CDN Setup** 🎯 HIGH IMPACT (If applicable)

- Cloudflare (free tier available)
- Bunny CDN
- AWS CloudFront

**Benefits:**

- Global edge caching
- Automatic compression
- DDoS protection
- Free SSL

### 8. **HTML Minification** 🎯 LOW IMPACT

Remove whitespace, comments:

```bash
npm install html-minifier-terser -g
html-minifier-terser --collapse-whitespace --remove-comments index.html -o index.min.html
```

### 9. **Service Worker (Progressive Web App)** 🎯 MEDIUM IMPACT

Cache assets for offline access:

```javascript
// sw.js
const CACHE_NAME = "gemiprint-v1";
const urlsToCache = ["/", "/styles.css", "/script.js", "/fonts/", "/images/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});
```

---

## Performance Budget

Target Metrics (Lighthouse):

- **First Contentful Paint:** < 1.0s
- **Largest Contentful Paint:** < 2.5s
- **Total Blocking Time:** < 200ms
- **Cumulative Layout Shift:** < 0.1
- **Speed Index:** < 3.0s

---

## Quick Wins (Implement Today)

1. ✅ **Minify HTML/CSS/JS** - 20-30% size reduction
2. ✅ **Add image lazy loading** - Faster initial load
3. ✅ **Enable Gzip/Brotli compression** - 70% size reduction
4. ✅ **Add resource hints** (preload, preconnect) - Parallel loading
5. ✅ **Optimize images to WebP** - 60% smaller files

---

## Measuring Performance

### Tools:

1. **Lighthouse** (Chrome DevTools) - Overall score
2. **WebPageTest.org** - Detailed waterfall analysis
3. **GTmetrix** - Performance monitoring
4. **Chrome DevTools Performance Tab** - Frame-by-frame analysis

### Command:

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://yoursite.com --view
```

---

## Current Strengths ✅

- Single-page architecture (no navigation overhead)
- Inline critical resources (CSS/JS)
- Efficient JavaScript (no heavy frameworks)
- Minimal dependencies
- Already using `font-display: swap`
- Optimized CSS variables (13 vs 20+)

---

## Estimated Impact

| Optimization   | Difficulty | Impact | Time Saved |
| -------------- | ---------- | ------ | ---------- |
| Image WebP     | Easy       | High   | 1-2s       |
| Gzip/Brotli    | Easy       | High   | 0.5-1s     |
| Font preload   | Easy       | Medium | 0.2-0.5s   |
| Minification   | Easy       | Low    | 0.1-0.3s   |
| CDN Setup      | Medium     | High   | 0.5-2s     |
| Service Worker | Hard       | Medium | 0.3-1s     |

**Total Potential:** 2.6-7.8 seconds faster load time!

---

## Next Steps

1. Run baseline Lighthouse audit
2. Implement "Quick Wins" section
3. Re-run audit to measure improvements
4. Set up CDN for global distribution
5. Monitor with ongoing performance tests

**Target:** Load in under 1 second on 3G connection ⚡
