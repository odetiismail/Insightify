import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  // apiKey: import.meta.env.REACT_APP_APIKEY,
  // projectId: import.meta.env.REACT_APP_PROJECTID,
  // storageBucket: import.meta.env.REACT_APP_STORAGEBUCKET,
  // appId: import.meta.env.REACT_APP_APPID

  apiKey: "AIzaSyBhyCK6r-4jUXbCJrxLyMM9Mp5EcGyw7Hg",
  projectId: "infogen-9d856",
  storageBucket: "infogen-9d856.appspot.com",
  appId: "1:132975629020:android:621d8821c98145e58fda19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);