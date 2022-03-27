import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBlogs} from "../firebase/firestore";

const BlogPage = () => {
    const {id} = useParams();


    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const get = async () => {
            const data = await getBlogs(id);
            console.log(data)
            setBlog(data.docs.map(doc => ({...doc.data()})));
        }
        get();
    }, [id])

    return (
        blog ?
            <div>
                <h1>{blog.title}</h1>
                <br/>
                <p>{blog.text}</p>
            </div>
            : <p>Loading . . .</p>
    );
}

export default BlogPage;
