import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEYK885HT7Z6yuy5tYp6NAKoiP3YqU3mA",
    authDomain: "noteswsei.firebaseapp.com",
    projectId: "noteswsei",
    storageBucket: "noteswsei.appspot.com",
    messagingSenderId: "655762656917",
    appId: "1:655762656917:web:7bca6853c9f22f4db4159c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export {db};

export default app;