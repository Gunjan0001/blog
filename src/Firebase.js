import {
  initializeApp
} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs
} from 'firebase/firestore';


import {
  getStorage,
  ref,
  uploadBytes
} from "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5gM-IDL820Xp-97v1jkG8OhKkofldFro",
  authDomain: "home-10136.firebaseapp.com",
  projectId: "home-10136",
  storageBucket: "home-10136.appspot.com",
  messagingSenderId: "74448779544",
  appId: "1:74448779544:web:b3db26a5f8216bc3d2066d"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const db = getFirestore(app);
export default db;
