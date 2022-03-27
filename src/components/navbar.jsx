import {FaReact, FaServer} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, loginGoogle, logout} from "../firebase/firebase";
import {useState, useEffect} from "react";

const Navbar = () => {

    const [navItem, setNavItem] = useState('');

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return null;

        if (user) setNavItem(<span className='text-primary pointer' onClick={() => logout()}>Logout</span>);
        else setNavItem(<span className='text-primary pointer' onClick={() => loginGoogle()}>Login with Google</span>);
    }, [user, loading])

    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>
                    <span className='text-warning'><FaServer />&nbsp;Firestore</span>
                    &nbsp;+&nbsp;
                    <span className='text-info'><FaReact />&nbsp;ReactJs</span>
                </Link>
                {navItem}
            </div>
        </nav>
    );
}

export default Navbar;
