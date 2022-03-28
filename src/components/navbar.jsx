import {FaBars, FaReact, FaServer} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, loginGoogle, logout} from "../firebase/firebase";
import {useState, useEffect} from "react";

const Navbar = () => {

    const [navItem, setNavItem] = useState('');

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return null;

        if (user) setNavItem(
            <div>
                <Link className="text-warning me-3" to="/new">New</Link>
                <Link className="text-warning me-3" onClick={() => logout()}>Logout</Link>
            </div>
        );
        else setNavItem(<Link className='text-warning pointer' to='/auth'>Login</Link>);
    }, [user, loading])

    return (
        <nav className='navbar navbar-light bg-light navbar-expand-lg'>
            <div className='container'>
                <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <FaBars/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Link className='navbar-brand mb-2 mb-lg-0' to='/'>
                        <span className='text-warning'>Fire</span><span className='text-info'>ReactJs</span>
                    </Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-info" to="/blogs">Blogs</Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex align-items-center">
                    {navItem}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
