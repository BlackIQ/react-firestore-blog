import {initializeApp} from "firebase/app";

import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBMZYgUUmKi907mAJ4Z1vRjFYOh0twtG_8",
    authDomain: "reactjs-firestore-1.firebaseapp.com",
    projectId: "reactjs-firestore-1",
    storageBucket: "reactjs-firestore-1.appspot.com",
    messagingSenderId: "800054677155",
    appId: "1:800054677155:web:d33d371a1b37aa6115b916",
    measurementId: "G-FHWX7Y32HB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

const register = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

const logout = () => {
    signOut(auth);
}

export {
    auth,
    login,
    logout,
    register,
}
