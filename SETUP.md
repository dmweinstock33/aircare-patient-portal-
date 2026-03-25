# Dean Rosecrans Patient Portal - Setup Guide

## Step 1: Set Up Firebase (Free)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Name it something like `dean-rosecrans-portal`
4. Disable Google Analytics (not needed) and click **Create Project**
5. Once created, click **Continue**

### Enable Email Authentication
1. In Firebase Console, go to **Build > Authentication**
2. Click **Get Started**
3. Click **Email/Password**
4. Toggle **Enable** and click **Save**

### Get Your Firebase Config
1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** and click the web icon `</>`
3. Register app with nickname like `patient-portal`
4. Copy the `firebaseConfig` object - you'll need these values

### Update app.js
Open `app.js` and replace the placeholder config with your values:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",           // Your actual API key
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

---

## Step 2: Deploy to GitHub Pages (Free)

### Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click **+** > **New repository**
3. Name it `patient-portal` (or similar)
4. Keep it **Public** (required for free GitHub Pages)
5. Click **Create repository**

### Upload Files
Option A - Using GitHub.com:
1. Click **"uploading an existing file"**
2. Drag and drop: `index.html`, `style.css`, `app.js`
3. Click **Commit changes**

Option B - Using Terminal:
```bash
cd /Users/davidweinstock/Desktop/AirCare
git init
git add index.html style.css app.js
git commit -m "Initial patient portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/patient-portal.git
git push -u origin main
```

### Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** > **Pages** (left sidebar)
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait 1-2 minutes, your site will be live at:
   `https://YOUR_USERNAME.github.io/patient-portal/`

---

## Step 3: Add Domain to Firebase (Required)

1. Go to Firebase Console > **Authentication** > **Settings**
2. Click **Authorized domains**
3. Click **Add domain**
4. Add: `YOUR_USERNAME.github.io`
5. Click **Add**

---

## Step 4: Set Up SMS Reorder System

### Option A: SimpleTexting (Recommended)
1. Sign up at [SimpleTexting.com](https://simpletexting.com) (~$29/mo)
2. Create a keyword (e.g., "REORDER")
3. Set up monthly scheduled messages:
   - "Hi [Name], it's time to reorder your tracheostomy supplies. Reply YES to confirm."
4. Manually export contacts from Jotform monthly, or use Zapier

### Option B: Textedly
1. Sign up at [Textedly.com](https://textedly.com)
2. Similar setup process

### Jotform SMS Consent
Your Jotform should include:
- Phone number field
- Checkbox: "I consent to receive monthly SMS reorder reminders"

---

## HIPAA Compliance Checklist

- [ ] **Jotform**: Upgrade to Gold/Enterprise plan and sign BAA
- [ ] **Firebase**: Review [Firebase HIPAA docs](https://firebase.google.com/support/privacy)
- [ ] **SMS Provider**: Ensure HIPAA compliance and sign BAA
- [ ] **All communications**: Use secure, encrypted channels

---

## Testing

1. Visit your GitHub Pages URL
2. Create a test account
3. Verify the Jotform loads correctly
4. Test login/logout functionality
5. Test password reset

---

## Future Integration with deanrosecrans.com

When ready to integrate with the main site:

**Option 1: Subdomain**
- Point `portal.deanrosecrans.com` to GitHub Pages
- In GitHub repo settings, add custom domain

**Option 2: Link from main site**
- Add a "Patient Portal" button on deanrosecrans.com
- Link to your GitHub Pages URL

**Option 3: Embed as iframe**
```html
<iframe src="https://YOUR_USERNAME.github.io/patient-portal/"
        width="100%" height="800px"></iframe>
```

---

## Support

For issues with:
- **Firebase**: [Firebase Documentation](https://firebase.google.com/docs)
- **GitHub Pages**: [GitHub Pages Documentation](https://docs.github.com/en/pages)
- **Jotform**: [Jotform Support](https://www.jotform.com/help/)
