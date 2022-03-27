import {useState, useEffect} from "react";
import BlogItem from "../components/blogitem";
import {getBlogs} from "../firebase/firestore";

const Blogs = () => {
    const [blogs, setBlogs] = useState(
        []
    );

    useEffect(() => {
        const get = async () => {
            const data = await getBlogs();
            setBlogs(data.docs.map(doc => ({...doc.data()})));
        }
        get();
    }, [])

    console.log(blogs);

    return (
        blogs.map(blog => {
            return <BlogItem blog={blog}/>
        })
    );
}

export default Blogs;
