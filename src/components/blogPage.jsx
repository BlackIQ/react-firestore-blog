import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {reference as blogRef} from "../firebase/firestore";
import {getDocs, query, where} from "firebase/firestore";

const BlogPage = () => {
    const {identifier} = useParams();


    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const get = async () => {
            const q = query(blogRef, where('identifier', '==', identifier));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setBlog(data);
        }
        get();
    }, [identifier])

    return (
        blog.length === 0
            ?
            <p>Loading . . .</p>
            :
            <div>
                <h1>{blog.title}</h1>
                <br/>
                <p>{blog.text}</p>
            </div>
    );
}

export default BlogPage;
