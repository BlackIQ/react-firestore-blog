import {useEffect, useState} from "react";
import {auth, reference as userRef} from "../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useHistory} from "react-router-dom";
import {getDocs, query, where} from "firebase/firestore";
import {newBlog, reference as blogRef} from "../firebase/firestore";
import BlogItem from "../components/blogitem";

function docIdGenerator(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const submit = e => {
        e.preventDefault();

        const data = {
            'identifier': docIdGenerator(10),
            'user': user.uid,
            'title': title,
            'text': text,
        };

        newBlog(data).then(() => {});

        setTitle('');
        setText('');
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
            <div className='row'>
                <div className='col-md-6'>
                    <div className='m-1 card-body shadow-6-soft'>
                        <h4 className='text-warning'>You blogs</h4>
                        <br/>
                        {
                            userBlogs.length === 0
                                ?
                                <p>Loading . . .</p>
                                :
                                userBlogs.map(blog => {
                                    return <BlogItem blog={blog}/>
                                })
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='m-1 card-body shadow-6-soft'>
                        <h4 className='text-info'>New blog</h4>
                        <br/>
                        <form onSubmit={submit}>
                            <label className='form-label' htmlFor='title'>Blog title</label>
                            <input id='title' className='form-control' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                            <br/>
                            <label className='form-label' htmlFor='text'>Blog text</label>
                            <textarea id='text' className='form-control' placeholder='Text' value={text} rows='10' onChange={(e) => setText(e.target.value)}/>
                            <br/>
                            {
                                title
                                    ?
                                    text
                                        ?
                                        <button className='btn btn-info' type='submit'>Post it</button>
                                        :
                                        <button className='btn btn-info' type='submit' disabled>Enter valid data</button>
                                    :
                                    <button className='btn btn-info' type='submit' disabled>Enter valid data</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
