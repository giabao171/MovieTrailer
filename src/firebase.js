import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: 'AIzaSyDFCCTlQhwygEL4zofmR1mpodcqq1cUHmI',
//     authDomain: 'movie-93b31.firebaseapp.com',
//     projectId: 'movie-93b31',
//     storageBucket: 'movie-93b31.appspot.com',
//     messagingSenderId: '489874974091',
//     appId: '1:489874974091:web:f01738410709b9fb133b8e',
//     measurementId: 'G-TNCHL5898B',
// };

const firebaseConfig = {
    apiKey: 'AIzaSyDFCCTlQhwygEL4zofmR1mpodcqq1cUHmI',
    authDomain: 'movie-93b31.firebaseapp.com',
    projectId: 'movie-93b31',
    storageBucket: 'movie-93b31.appspot.com',
    messagingSenderId: '489874974091',
    appId: '1:489874974091:web:f01738410709b9fb133b8e',
    measurementId: 'G-TNCHL5898B',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
