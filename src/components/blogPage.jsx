import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getBlog} from "../firebase/firestore";

const Blogpage = () => {
    const {id} = useParams();

    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const get = async () => {
            const data = await getBlog(id);
            // setBlog(data);
            console.log(data);
        }
        get();
    }, [])

    return (
        <div>
            <h3>{blog.title}</h3>
        </div>
    );
}

export default Blogpage;
