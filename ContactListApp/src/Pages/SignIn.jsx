import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const auth = getAuth(app);

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signinUser = () => {
        if (email === "" || password === "") {
            toast.error("Please fill in all fields.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success("Login successful!");
                setTimeout(() => {
                    navigate('/contacts'); // Navigate to contacts page after 1.5 seconds
                }, 1500);
            })
            .catch((err) => {
                switch (err.code) {
                    case "auth/user-not-found":
                        toast.error("Account does not exist.");
                        break;
                    case "auth/wrong-password":
                        toast.error("Incorrect password or email.");
                        break;
                    case "auth/invalid-email":
                        toast.error("Invalid email format.");
                        break;
                    default:
                        toast.error(`Error: ${err.message}`);
                }
            });
    };

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <h1>Sign In</h1>
                <form className='signin-form'>
                    <div className="form-group">
                        <label>Enter Your Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email'
                            placeholder='Enter Your Email'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Enter Your Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            placeholder='Enter Your Password'
                            required
                        />
                    </div>

                    <button type="button" onClick={signinUser} className='signin-btn'>Sign In</button>
                </form>

                {/* Link to Sign Up page */}
                <div className="signin-link">
                    <p>Don't Have an Account?</p>
                    <button className='signin-link-btn' onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            </div>

            {/* Toastify Container */}
            <ToastContainer />
        </div>
    );
};

export default SigninPage;
