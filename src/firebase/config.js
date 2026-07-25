import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app = null;
let auth = null;
let db = null;
let storage = null;
let isFirebaseAvailable = false;

// Check if variables are configured
const hasConfig = 
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID;

if (hasConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    isFirebaseAvailable = true;
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.warn("Firebase initialization failed, falling back to mock database:", error);
  }
} else {
  console.log("Firebase environment variables not found. Running in Offline Mock Database mode.");
}

export { app, auth, db, storage, isFirebaseAvailable };
