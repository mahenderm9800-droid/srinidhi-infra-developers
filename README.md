# Srinidhi Infra Developers Website

A modern, professional, trust-inspiring real estate and infrastructure website built for **Srinidhi Infra Developers**.

This project features a clean, responsive layout utilizing:
- **React 18** (Vite build tool)
- **Tailwind CSS** (Custom theme colors for real-estate authority)
- **React Router v6**
- **Framer Motion** for subtle entrance transitions
- **Firebase / LocalStorage dual database service** (runs immediately offline!)

---

## Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.

### 2. Installation
Clone the repository, navigate to the directory, and run:
```bash
npm install
```

### 3. Run the Development Server
To launch the application locally in offline/mock database mode:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Offline Mock Database Mode

To make testing and modifications extremely easy, the website implements a dual-mode database. If no Firebase environment variables are defined, the application:
1. **Pre-populates** a mock database in the browser's `localStorage` using structured seed data (found in [`src/services/seedData.js`](file:///c:/Users/navya/Downloads/SRINIDHI%20INFRA%20DEVELOPERS/src/services/seedData.js)).
2. Provides a fully operational **Admin Dashboard** allowing you to:
   - Create, edit, and delete Projects (residential, commercial, plots).
   - Read customer Lead Enquiries, change lead status (New, Contacted, Closed), and delete them.
   - Manage Customer Testimonials.
   - Publish, edit, and delete Blog Articles.

### Admin Dashboard Login Credentials (Offline Fallback)
- **URL**: `/admin/login` (or click "Admin Access" in the footer)
- **Email**: `admin@srinidhi.com`
- **Password**: `admin123`

---

## Firebase Configuration (Production setup)

To configure the live production Firebase backend:

### 1. Create a Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/).
- Create a new project named **Srinidhi Infra Developers**.

### 2. Enable Firestore Database
- Under Build, click **Firestore Database**.
- Click **Create Database** and set it in test mode or production mode.
- Set up security rules (recommended config in section below).

### 3. Enable Firebase Authentication
- Under Build, click **Authentication**.
- Click **Get Started**, choose **Email/Password**, and enable it.
- Add an administrator email (e.g., `admin@srinidhi.com`) and choose a strong password.

### 4. Create local environment file
Create a `.env` file in the root folder and add your Firebase SDK credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
Restart your development server. The service layer will automatically detect these credentials and connect directly to Firestore!

### 5. Firestore Rules
Paste the following security rules in Firestore console:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projects, Testimonials and Blogs are readable by all; writable only by authenticated users
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /testimonials/{testimonialId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Enquiries can be submitted by anyone, but read/updated only by authenticated admins
    match /enquiries/{enquiryId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

---

## Build & Deployment

### Production Build
To build the minified production bundle inside the `dist` directory:
```bash
npm run build
```

### Firebase Hosting Deployment
1. Install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```
2. Login to your Firebase Account:
   ```bash
   firebase login
   ```
3. Initialize hosting in the project folder:
   ```bash
   firebase init
   ```
   *Select Hosting, choose your project, set public directory to `dist`, and configure it as a single-page application.*
4. Deploy the build:
   ```bash
   firebase deploy
   ```
