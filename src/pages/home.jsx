import {useEffect} from "react";
import {auth} from "../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useHistory} from "react-router-dom";

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
            <h1>{user.email}</h1>
        </div>
    );
}

export default Home;
