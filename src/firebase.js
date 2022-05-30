import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJmjIIgVpzJBq3vyFldIxJE2Sgqu7O_PI",
  authDomain: "phone-auth-45dab.firebaseapp.com",
  projectId: "phone-auth-45dab",
  storageBucket: "phone-auth-45dab.appspot.com",
  messagingSenderId: "570132452833",
  appId: "1:570132452833:web:58f1450ce9fecd5929aea0"
};
 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
