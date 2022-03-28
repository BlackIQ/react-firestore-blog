import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {auth, login, register} from "../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";

const Auth = () => {

    const history = useHistory();

    // Register states
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    // Login states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) return;
        if (user) history.push('/home');
    }, [user, loading]);

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='m-1 shadow card-body'>
                        <h3 className='text-warning'>Create your account</h3>
                        <br/>
                        <label className='form-label' htmlFor='name'>Name</label>
                        <input className='form-control' type='text' placeholder='Name' id='name' onChange={e => setRegisterName(e.target.value)}/>
                        <br/>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input className='form-control' type='email' placeholder='Email' id='email' onChange={e => setRegisterEmail(e.target.value)}/>
                        <br/>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input className='form-control' type='password' placeholder='Password' id='password' onChange={e => setRegisterPassword(e.target.value)}/>
                        <br/>
                        <button onClick={() => register(registerName, registerEmail, registerPassword)} className='btn btn-warning w-100'>Create my account</button>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='m-1 shadow card-body'>
                        <h3 className='text-info'>Login to your account</h3>
                        <br/>
                        <label className='form-label' htmlFor='login_email'>Email</label>
                        <input className='form-control' type='email' placeholder='Email' id='login_email' onChange={e => setLoginEmail(e.target.value)}/>
                        <br/>
                        <label className='form-label' htmlFor='login_password'>Password</label>
                        <input className='form-control' type='password' placeholder='Password' id='login_password' onChange={e => setLoginPassword(e.target.value)}/>
                        <br/>
                        <button onClick={() => login(loginEmail, loginPassword)} className='btn btn-info w-100'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
