import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig1 = {
  apiKey: "AIzaSyBqHomX-GSUzQOf9j6g3G4HNGTlQPtySdk",
  authDomain: "un-truc-de-jesus-carte.firebaseapp.com",
  projectId: "un-truc-de-jesus-carte",
  storageBucket: "un-truc-de-jesus-carte.appspot.com",
  messagingSenderId: "255170124059",
  appId: "1:255170124059:web:9b7818ec3f7e5b127b9bbe",
  measurementId: "G-E7R22DLZ61",
};
const firebaseConfig = {
  apiKey: "AIzaSyDVLs9ZTU8F5JuderX7A3tprvPtmSpmgx0",
  authDomain: "carte-interactive-e3ecd.firebaseapp.com",
  projectId: "carte-interactive-e3ecd",
  storageBucket: "carte-interactive-e3ecd.appspot.com",
  messagingSenderId: "293631422400",
  appId: "1:293631422400:web:6adbc60f1ba0f23a0be225",
  measurementId: "G-BNSYY511FN",
};
const app1 = initializeApp(firebaseConfig1, "firestore");
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app1);

export { storage, db };
