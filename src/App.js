import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {newBlog} from "./firebase/firestore";
import BlogPage from "./components/blogPage";
import Navbar from "./components/navbar";
import {auth} from "./firebase/firebase";
import Blogs from "./pages/blogs";
import Home from "./pages/home";
import Auth from "./pages/auth";
import {useState} from "react";
import New from "./pages/new";


function docIdGenerator(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function App() {

    const [user, loading, error] = useAuthState(auth);

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

    return (
        <Router>
            <Navbar />
            <div className='container py-4'>
                <Switch>
                    <Route exact path='/'>Index</Route>
                    <Route exact path='/blogs'><Blogs/></Route>
                    <Route exact path='/new'><New/></Route>
                    <Route path='/blog/:identifier'><BlogPage/></Route>
                    <Route exact path='/auth'><Auth /></Route>
                    <Route exact path='/home'><Home /></Route>
                </Switch>
            </div>
            <div className='modal fade' id='newblog' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <form onSubmit={submit}>
                            <div className='modal-header'>
                                <h5 className="modal-title" id="exampleModalLabel">New blog</h5>
                                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className='modal-body'>
                                <label className='form-label' htmlFor='title'>Blog title</label>
                                <input id='title' className='form-control' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                                <br/>
                                <label className='form-label' htmlFor='text'>Blog text</label>
                                <textarea id='text' className='form-control' placeholder='Text' value={text} rows='10' onChange={(e) => setText(e.target.value)}/>
                            </div>
                            <div className='modal-footer'>
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
