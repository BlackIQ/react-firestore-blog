import {useState} from "react";
import {newBlog} from "../firebase/firestore";

const New = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const submit = e => {
        e.preventDefault();

        const data = {title, text};

        newBlog(data).then(() => {});

        setTitle('');
        setText('');
    }

    return (
        <div>
            <form onSubmit={submit}>
                <label className='form-label' htmlFor='title'>Blog title</label>
                <input id='title' className='form-control' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <br/>
                <label className='form-label' htmlFor='text'>Blog text</label>
                <textarea id='text' className='form-control' placeholder='Text' value={text} rows='10' onChange={(e) => setText(e.target.value)}/>
                <br/>
                {
                    title ? text && <button className='btn btn-warning' type='submit'>Post it</button> : <button className='btn btn-warning' type='submit' disabled>Enter valid data</button>
                }
            </form>
        </div>
    );
}

export default New;
