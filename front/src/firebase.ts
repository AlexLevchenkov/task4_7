import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const firebaseAuth = {
  signUp: (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password),
  signIn: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),
  signOut: () => signOut(auth),
  onAuthStateChanged: (callback: (user: User | null) => void) =>
    onAuthStateChanged(auth, callback),
};
