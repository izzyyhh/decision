import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";

import config from "../config";

interface IFirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

const firebaseConfig: IFirebaseConfig = {
    apiKey: config.REACT_APP_FIREBASE_APIKEY,
    authDomain: config.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: config.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: config.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: config.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: config.REACT_APP_FIREBASE_APPID,
    measurementId: config.REACT_APP_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app as app, auth as auth, signInWithCustomToken as signInWithCustomToken };
