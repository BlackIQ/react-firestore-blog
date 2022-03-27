import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBlog} from "../firebase/firestore";

const BlogPage = () => {
    const {id} = useParams();

    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const get = async () => {
            const data = await getBlog(id);
            setBlog(data.docs.map(doc => ({...doc.data()})));
        }
        get();
    }, [])

    return (
        <div>
            <h3>{blog[0].title}</h3>
        </div>
    );
}

export default BlogPage;
