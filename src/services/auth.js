import { auth, isFirebaseAvailable } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged as fbOnAuthStateChanged 
} from 'firebase/auth';

const OFFLINE_ADMIN = {
  email: "admin@srinidhi.com",
  uid: "offline-admin-uid",
  role: "admin"
};

// Custom listener list for mock auth
let mockListeners = [];
let currentMockUser = null;

// Initialize mock user from localStorage if it exists
if (!isFirebaseAvailable) {
  const storedUser = localStorage.getItem('srinidhi_admin_user');
  if (storedUser) {
    currentMockUser = JSON.parse(storedUser);
  }
}

export const login = async (email, password) => {
  if (isFirebaseAvailable) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Firebase auth login error:", error);
      throw error;
    }
  }

  // Mock Authentication Flow
  if (email === OFFLINE_ADMIN.email && password === "admin123") {
    currentMockUser = OFFLINE_ADMIN;
    localStorage.setItem('srinidhi_admin_user', JSON.stringify(OFFLINE_ADMIN));
    // Trigger listeners
    mockListeners.forEach(listener => listener(OFFLINE_ADMIN));
    return OFFLINE_ADMIN;
  } else {
    throw new Error("auth/invalid-credential");
  }
};

export const logout = async () => {
  if (isFirebaseAvailable) {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      console.error("Firebase auth logout error:", error);
      throw error;
    }
  }

  currentMockUser = null;
  localStorage.removeItem('srinidhi_admin_user');
  mockListeners.forEach(listener => listener(null));
};

export const onAuthStateChanged = (callback) => {
  if (isFirebaseAvailable) {
    return fbOnAuthStateChanged(auth, callback);
  }

  // Mock Auth State Changed
  mockListeners.push(callback);
  // Call immediately with current state
  callback(currentMockUser);

  // Return unsubscribe function
  return () => {
    mockListeners = mockListeners.filter(listener => listener !== callback);
  };
};
