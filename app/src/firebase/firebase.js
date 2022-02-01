import firebase from 'firebase/compat/app'
import process from 'process';
// export default {
//     type: process.env.FIREBASE_TYPE,
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: process.env.FIREBASE_AUTH_URI,
//     token_uri: process.env.FIREBASE_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_x509_CERT_URL,
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_x509_CERT_URL,
// };

const firebaseConfig = {
    // apiKey: "AIzaSyAhT09_YhMb4au6mmiB3t08Wick72YGFnQ",
    // authDomain: "decision-app-mmp3.firebaseapp.com",
    // projectId: "decision-app-mmp3",
    // storageBucket: "decision-app-mmp3.appspot.com",
    // messagingSenderId: "856140484673",
    // appId: "1:856140484673:web:0487b7fac801397dbc76c0",
    // measurementId: "G-FD14H7XHRY"
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

firebase.initializeApp(firebaseConfig);
const auth1 = firebase.auth();
export { auth1 as auth };
