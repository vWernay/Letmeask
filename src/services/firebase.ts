import { initializeApp } from 'firebase/app';

import { getAuth, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { getDatabase, ref, push, get, onValue, off, remove, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, database, GoogleAuthProvider, signInWithPopup, ref, push, get, onValue, off, remove, update };