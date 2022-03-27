import {useState, useEffect} from "react";
import {auth} from "../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useHistory} from "react-router-dom";
import {FaReact, FaServer} from "react-icons/fa";

const Home = () => {

    const [user, loading, error] = useAuthState(auth);

    const history = useHistory();

    useEffect(() => {
        if (loading) return null;
        if (!user) history.push('/');
    }, [user, loading]);

    if (!user) return null;

    return (
        <div>
            <h1>{user.displayName}</h1>
        </div>
    );
}

export default Home;
