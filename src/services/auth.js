import { auth, isFirebaseAvailable } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged as fbOnAuthStateChanged 
} from 'firebase/auth';

let mockListeners = [];

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

  // Never emulate privileged authentication in browser code. VITE_* values are
  // public after bundling and cannot safely protect an administrator account.
  throw new Error("auth/service-unavailable: Firebase authentication is not configured.");
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

  mockListeners.forEach(listener => listener(null));
};

export const onAuthStateChanged = (callback) => {
  if (isFirebaseAvailable) {
    return fbOnAuthStateChanged(auth, callback);
  }

  // Mock Auth State Changed
  mockListeners.push(callback);
  // Call immediately with current state
  callback(null);

  // Return unsubscribe function
  return () => {
    mockListeners = mockListeners.filter(listener => listener !== callback);
  };
};
