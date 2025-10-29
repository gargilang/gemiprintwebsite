# Google Reviews Auto-Update Guide

## How It Works Without Node Locally

You **DO NOT need Node.js installed** on your local PC. Here's the workflow:

### Server-Side Automation (GitHub Actions)

1. **GitHub's servers** (not your PC) run the `fetch-reviews.mjs` script daily at 2 AM UTC
2. The script calls Google Places API to get your latest 5 reviews
3. It updates `reviews.json` automatically
4. GitHub commits the changes back to your repository
5. Your GitHub Pages site rebuilds with the new reviews

### Your Local Development Flow

```
You: Edit HTML/CSS/JS locally → Commit & Push
  ↓
GitHub: Runs auto-update daily → Fetches reviews → Updates reviews.json
  ↓
You: Pull latest changes → Now you have fresh reviews.json locally
  ↓
Test on http://127.0.0.1:5500/ → See the reviews GitHub fetched
```

**No Node needed on your PC!** GitHub's cloud servers handle it all.

---

## Google Places API Setup

### Do You Need It?

**YES** - to automatically fetch reviews from Google Maps.

### Does It Cost Money?

**MOSTLY FREE** for your use case:

- Google gives you **$200 free credit per month**
- Place Details API costs **$0.017 per request**
- Your automation runs **once per day = ~30 requests/month**
- **Cost: $0.51/month** (well under the free $200 credit)
- **You pay: $0** (unless you make 11,765+ requests/month)

### How to Get Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "GemiPrint Reviews")
3. Enable **Places API** (New)
4. Go to **Credentials** → Create API Key
5. **IMPORTANT**: Restrict your key:
   - API restrictions: Only select "Places API"
   - (No IP restriction needed for GitHub Actions)

### Add Key to GitHub (Keep It Secret!)

1. Go to your GitHub repo: `https://github.com/gargilang/gemiprintwebsite`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GOOGLE_PLACES_API_KEY`
5. Value: Paste your API key
6. Click **Add secret**

**NEVER commit your API key to code!** Only store it in GitHub Secrets.

---

## How to Use

### First Time Setup

1. Get Google Places API key (see above)
2. Add it to GitHub Secrets as `GOOGLE_PLACES_API_KEY`
3. Push this repo to GitHub (including the `.github/workflows/` folder)
4. Done! Reviews will auto-update daily.

### Manual Trigger (Test It Now)

1. Go to your repo on GitHub
2. Click **Actions** tab
3. Select **Update Google Reviews** workflow
4. Click **Run workflow** → **Run workflow**
5. Wait 30 seconds, then check the commit history
6. You should see a new commit: "chore: update Google reviews"

### Pull Fresh Reviews to Local

After GitHub updates reviews (daily or manual):

```bash
git pull
```

Now your local `reviews.json` has the latest reviews fetched by GitHub.

Test on your local dev server—you'll see the fresh reviews!

---

## What Gets Fetched

- **Up to 5 reviews** (Google's API limit per request)
- **Only reviews with text** (star-only reviews are ignored)
- **Merged with existing** (no duplicates)
- **Plus 4 fake reviews** (always included for volume)

---

## Troubleshooting

### "No reviews fetched"

- Check that your API key is correct in GitHub Secrets
- Make sure Places API is enabled in Google Cloud Console
- Verify your place name in the workflow file: "Percetakan gemiprint Cifest Walk Cikarang"

### "API key restricted"

- In Google Cloud Console, make sure your API key has Places API enabled
- Remove any IP restrictions (GitHub Actions uses dynamic IPs)

### "I don't see new reviews locally"

- Run `git pull` to get the latest reviews.json from GitHub
- Check the Actions tab to see if the workflow ran successfully

---

## Cost Summary

| Item              | Cost                       |
| ----------------- | -------------------------- |
| GitHub Actions    | Free (2,000 minutes/month) |
| GitHub Pages      | Free                       |
| Google Places API | $200 free credit/month     |
| Your actual usage | ~$0.51/month               |
| **What you pay**  | **$0**                     |

---

## Manual Update (If You Have Node Later)

If you ever get Node access:

```powershell
$env:GOOGLE_PLACES_API_KEY = "your_key_here"
node ./tools/fetch-reviews.mjs
```

This updates reviews.json locally without waiting for GitHub.

But **you don't need this** for the automation to work!
