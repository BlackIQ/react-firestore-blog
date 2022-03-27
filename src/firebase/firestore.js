import {initializeApp} from "firebase/app";

import {
    addDoc,
    collection, getDocs,
    getFirestore,
    where,
    query,
} from "firebase/firestore";

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
const db = getFirestore(app);
const reference = collection(db, 'blogs');

const getBlogs = async () => {
    return await getDocs(reference);
}

const getBlog = async (id) => {
    return await getDocs(reference)
}

const newBlog = async (data) => {
    await addDoc(reference, data);
}

export {
    getBlogs,
    newBlog,
}
