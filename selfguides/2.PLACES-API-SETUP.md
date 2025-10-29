# Google Places API Setup - Step by Step Guide

## Part 1: Google Cloud Console Setup

### Step 1: Create a New Project

1. You should see **Google Cloud Console** dashboard
2. At the top, click the **project dropdown** (next to "Google Cloud")
3. Click **"NEW PROJECT"** button (top right of popup)
4. Fill in:
   - **Project name**: `GemiPrint Reviews` (or any name you like)
   - **Organization**: Leave as "No organization" (fine for personal use)
5. Click **"CREATE"**
6. Wait 10-20 seconds for project creation
7. You'll see a notification when ready

---

### Step 2: Select Your New Project

1. Click the **project dropdown** again (top bar)
2. Find and click **"GemiPrint Reviews"** from the list
3. Verify the project name shows in the top bar

---

### Step 3: Enable Places API

1. In the left sidebar, find and click **"APIs & Services"** → **"Library"**

   - Or use search bar at top: type "API Library" and press Enter

2. In the API Library search box, type: **"Places API"**

3. You'll see two options:

   - **"Places API (New)"** ← Click this one ✅
   - ~~"Places API" (old version)~~ ← Don't click this

4. Click **"Places API (New)"**

5. On the next page, click the blue **"ENABLE"** button

6. Wait 5-10 seconds. You'll see "API enabled" confirmation

---

### Step 4: Create API Key

1. In left sidebar, click **"APIs & Services"** → **"Credentials"**

2. At the top, click **"+ CREATE CREDENTIALS"**

3. Select **"API key"** from dropdown

4. A popup appears showing your API key:

   ```
   Your API key: AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

5. **IMPORTANT**: Click **"COPY"** button to copy the key

   - Paste it somewhere safe temporarily (Notepad, etc.)
   - We'll use this in Part 2

6. **Do NOT close this popup yet!** Click **"EDIT API KEY"** button

---

### Step 5: Restrict Your API Key (Security)

**Why**: Without restrictions, anyone who finds your key can use your quota and cost you money.

#### 5a. API Restrictions

1. Scroll down to **"API restrictions"** section

2. Select **"Restrict key"** (the radio button)

3. In the dropdown that appears, search for and select:

   - ✅ **Places API (New)**

4. Click **"OK"** or close the dropdown

#### 5b. Application Restrictions (Optional but Recommended)

1. Scroll up to **"Application restrictions"** section

2. You have options:

   - **"None"** ← Fine for GitHub Actions (simpler)
   - **"IP addresses"** ← More secure but GitHub Actions uses dynamic IPs, so not practical

3. For now, keep it as **"None"** (we're only using it in GitHub Actions, not exposed in browser)

4. Click **"SAVE"** button at the bottom

5. You'll see your key in the credentials list now

---

### Step 6: Verify Your API Key

1. Copy your API key again (from the credentials list, click the copy icon)

2. Open a new browser tab and paste this URL (replace `YOUR_API_KEY`):

   ```
   https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Percetakan%20gemiprint%20Cifest%20Walk&inputtype=textquery&fields=place_id,name&key=YOUR_API_KEY
   ```

3. Press Enter

4. You should see JSON response like:

   ```json
   {
     "candidates": [
       {
         "name": "Percetakan gemiprint",
         "place_id": "ChIJdUS..."
       }
     ],
     "status": "OK"
   }
   ```

5. If you see `"status": "OK"` → **Success!** ✅

6. If you see `"status": "REQUEST_DENIED"` → Check that you enabled Places API (New) and saved restrictions

---

## Part 2: GitHub Integration

Now we'll add your API key to GitHub so the automated workflow can fetch reviews.

### Step 7: Add API Key to GitHub Secrets

1. **Open your GitHub repository** in browser:

   ```
   https://github.com/gargilang/gemiprintwebsite
   ```

2. Click the **"Settings"** tab (top right, next to "Insights")

3. In the left sidebar, scroll down to find:

   - **"Secrets and variables"** → Click it
   - Then click **"Actions"** in the submenu

4. You should see page: **"Actions secrets and variables"**

5. Click the green **"New repository secret"** button (top right)

6. Fill in the form:

   - **Name**: `GOOGLE_PLACES_API_KEY` (must be EXACTLY this, case-sensitive!)
   - **Secret**: Paste your API key from Step 4
     ```
     AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     ```

7. Click **"Add secret"** button

8. You should see it in the list now:
   ```
   GOOGLE_PLACES_API_KEY (Updated X seconds ago)
   ```

**IMPORTANT**:

- ✅ You can see the secret name, but NOT the value (for security)
- ✅ This is correct! GitHub hides the actual API key from everyone (even you)
- ❌ **Never commit your API key to code!** Only store in GitHub Secrets

---

### Step 8: Push Your Code to GitHub

Make sure all the files are in your repository:

1. **Open PowerShell** in your project folder:

   ```powershell
   cd d:\gemi\gemiprint\gemiprintwebsite\gemiprintwebsite
   ```

2. **Check git status**:

   ```powershell
   git status
   ```

3. **Add all new files**:

   ```powershell
   git add .
   ```

4. **Commit changes**:

   ```powershell
   git commit -m "Add Google Places API integration and SEO optimization"
   ```

5. **Push to GitHub**:
   ```powershell
   git push origin main
   ```

---

### Step 9: Verify GitHub Actions Workflow

After pushing, the workflow file should be visible on GitHub:

1. Go to your repo on GitHub
2. Navigate to: `.github/workflows/fetch-reviews.yml`
3. Verify the file exists and contains the workflow

---

### Step 10: Test the Workflow (Manual Run)

Let's test if everything works:

1. In your GitHub repo, click the **"Actions"** tab (top menu)

2. In the left sidebar, click **"Update Google Reviews"**

3. On the right side, click **"Run workflow"** dropdown button

4. Click the green **"Run workflow"** button in the dropdown

5. Wait 20-30 seconds, then refresh the page

6. You should see a workflow run appear:

   - ✅ Green checkmark = Success!
   - ❌ Red X = Failed (check error logs)

7. Click on the workflow run to see details

8. If successful, check the **"Commits"** tab in your repo

   - You should see a new commit: "chore: update Google reviews [skip ci]"

9. Click on `reviews.json` to verify it has fresh reviews from Google

---

### Step 11: Pull Updated Reviews to Your Local Machine

After GitHub fetches reviews:

```powershell
# Navigate to your project folder
cd d:\gemi\gemiprint\gemiprintwebsite\gemiprintwebsite

# Pull the latest changes (includes updated reviews.json)
git pull origin main
```

Now open `reviews.json` - you should see fresh reviews from Google!

---

## Part 3: Automatic Daily Updates

Your workflow is already configured to run **automatically every day at 2 AM UTC** (10 AM Jakarta time).

### How It Works

1. **Every day at 2 AM UTC**, GitHub Actions:

   - Runs `node ./tools/fetch-reviews.mjs`
   - Fetches latest 5 reviews from Google Places API
   - Merges with existing reviews in `reviews.json`
   - Commits the updated file back to your repo

2. **Your website** (GitHub Pages):

   - Rebuilds automatically when `reviews.json` changes
   - Displays the fresh reviews to visitors

3. **On your local machine**:
   - Run `git pull` anytime to get the latest reviews
   - Test on http://127.0.0.1:5500/ with fresh data

---

## Troubleshooting

### Error: "REQUEST_DENIED"

**Cause**: API key restrictions too strict, or Places API not enabled

**Fix**:

1. Go back to Google Cloud Console → Credentials
2. Click your API key
3. Check "API restrictions" → Make sure "Places API (New)" is selected
4. Check "Application restrictions" → Set to "None" for GitHub Actions
5. Save and wait 1-2 minutes for changes to propagate

---

### Error: "This API project is not authorized to use this API"

**Cause**: Places API (New) not enabled

**Fix**:

1. Go to Google Cloud Console → APIs & Services → Library
2. Search "Places API (New)"
3. Click it and click "ENABLE"
4. Wait 1-2 minutes

---

### Error: "Could not resolve place_id from query"

**Cause**: Business name not found or query too generic

**Fix**:

1. Edit `.github/workflows/fetch-reviews.yml`
2. Change the `PLACE_QUERY` line to be more specific:
   ```yaml
   PLACE_QUERY: "Percetakan gemiprint Ruko Pasadena Cikarang"
   ```
3. Or find your Place ID manually:
   - Go to Google Maps
   - Search your business
   - Look at URL: `...place/NAME/@LAT,LNG,17z/data=...!1s0x2e699b2afa0c4475:0x98436d6859c9c48c`
   - The part after `!1s` is your Place ID: `0x2e699b2afa0c4475:0x98436d6859c9c48c`
   - Add to workflow:
     ```yaml
     GOOGLE_PLACE_ID: "0x2e699b2afa0c4475:0x98436d6859c9c48c"
     ```

---

### Workflow Fails: "API key not valid"

**Cause**: API key not added to GitHub Secrets, or wrong name

**Fix**:

1. Check GitHub → Settings → Secrets → Actions
2. Verify secret name is exactly: `GOOGLE_PLACES_API_KEY` (case-sensitive)
3. Delete and re-create if needed

---

### No Reviews Fetched

**Cause**: Google Places API only returns 5 most recent reviews with text

**Solution**:

- This is a Google limitation
- Your site will still show the 4 fake reviews as backup
- Total reviews: ~5 real + 4 fake = 9 rotating reviews

---

## Cost Monitoring

### Check Your Usage

1. Go to Google Cloud Console
2. Click **"Billing"** in left sidebar
3. Click **"Reports"**
4. Filter by **"Places API (New)"**
5. You'll see daily usage and costs

### Expected Costs

- **Free tier**: $200/month credit
- **Your usage**: 1 request/day = ~$0.51/month
- **What you pay**: $0 (well under free tier)

### Set Up Budget Alert (Optional)

1. In Billing, click **"Budgets & alerts"**
2. Click **"CREATE BUDGET"**
3. Set budget: $5/month
4. Set alert: When 50% spent
5. Add your email
6. Click **"FINISH"**

You'll get email if usage approaches $5 (won't happen at 1 request/day).

---

## Summary Checklist

Before you're done, verify:

- ✅ Google Cloud project created
- ✅ Places API (New) enabled
- ✅ API key created and restricted to Places API
- ✅ API key tested (returned valid JSON)
- ✅ API key added to GitHub Secrets as `GOOGLE_PLACES_API_KEY`
- ✅ Code pushed to GitHub (including `.github/workflows/fetch-reviews.yml`)
- ✅ Workflow manually tested (green checkmark)
- ✅ `reviews.json` updated with fresh reviews
- ✅ Pulled latest changes to local machine

---

## Next Time You Want Fresh Reviews

### Option 1: Wait for Automatic Update

Just wait until tomorrow at 2 AM UTC (10 AM Jakarta time). GitHub will fetch automatically.

### Option 2: Manual Trigger

1. Go to GitHub → Actions → Update Google Reviews
2. Click "Run workflow"
3. Wait 30 seconds
4. Run `git pull` locally

### Option 3: Local Fetch (If You Install Node Later)

```powershell
$env:GOOGLE_PLACES_API_KEY = "your_key_here"
node ./tools/fetch-reviews.mjs
```

---

## Questions?

If you encounter any errors not covered here, check:

1. GitHub Actions logs (detailed error messages)
2. Google Cloud Console → APIs & Services → Dashboard (quota/errors)
3. The workflow run details (click on failed workflow for logs)

**Common question**: "Why only 5 reviews?"

- Google Places API limitation - they only return up to 5 reviews per request
- Your site adds 4 fake reviews, so you'll have ~9 total
- This is enough for the rotating display (3/4/2 visible at a time)

---

Good luck! 🚀
