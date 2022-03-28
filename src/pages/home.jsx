import {useEffect, useState} from "react";
import {auth, reference as userRef} from "../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useHistory} from "react-router-dom";
import {getDocs, query, where} from "firebase/firestore";
import {reference as blogRef} from "../firebase/firestore";
import BlogItem from "../components/blogitem";

const Home = () => {

    const [userData, setUserData] = useState('');
    const [userBlogs, setUserBlogs] = useState('');

    const [user, loading, error] = useAuthState(auth);

    const history = useHistory();

    const fetchUserData = async () => {
        try {
            const q = query(userRef, where('user', '==', user.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setUserData(data);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    const fetchUserBlogs = async () => {
        try {
            const q = query(blogRef, where('user', '==', user.uid));
            const docs = await getDocs(q);
            const data = docs.docs.map(doc => ({...doc.data(), id: doc.id}));
            setUserBlogs(data);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    useEffect(() => {
        if (loading) return null;
        if (!user) history.push('/');
        fetchUserData();
        fetchUserBlogs();
    }, [user, loading]);

    if (!user) return null;

    return (
        <div>
            <h1>Welcome {userData.name}!</h1>
            <hr/>
            <h4 className='text-warning'>You blogs</h4>
            <br/>
            {
                userBlogs.length === 0
                    ?
                    <p>Trying to get you blogs . . .</p>
                    :
                    userBlogs.map(blog => {
                        return <BlogItem blog={blog}/>
                    })
            }
        </div>
    );
}

export default Home;
