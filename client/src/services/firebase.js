import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0EoWnWj0Rd6BH5YDv4egbrazhr5UQGeg",
  authDomain: "cv-builder-project-2e998.firebaseapp.com",
  projectId: "cv-builder-project-2e998",
  storageBucket: "cv-builder-project-2e998.appspot.com",
  messagingSenderId: "819250189571",
  appId: "1:819250189571:web:20ddd436fffee00dd1c536",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

// ✅ ADD THIS (You are missing this)
export const googleProvider = new GoogleAuthProvider();
