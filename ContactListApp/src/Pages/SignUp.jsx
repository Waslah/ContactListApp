import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database"; // For Firebase Realtime Database
import { app } from "../firebase";
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const auth = getAuth(app);
const db = getDatabase(app);

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const createUser = () => {
        if (!email || !password) {
            toast.error("Email and password are required.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                set(ref(db, 'users/' + user.uid), {
                    email: email,
                    createdAt: new Date().toISOString(),
                });

                toast.success('Sign up successful!');

                setTimeout(() => {
                    navigate('/signin');
                }, 1000); 
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    toast.error("This email is already registered.");
                } else {
                    toast.error("Error creating user: " + error.message);
                }
            });
    };

    return (
        <div className='signup-container'>
            <div className="signup-card">
                <h1 >Sign Up</h1>
                <form className='signup-form'>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email'
                            placeholder='Enter Your Email'
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            placeholder='Enter Your Password'
                            required
                        />
                    </div>

                    <button type="button" onClick={createUser} className='signup-btn'>Sign Up</button>

                    {/* New button for "Already have an account? Sign In" inside the card */}
                    <div className="signin-link">
                        <p>Already have an account?</p>
                        <button onClick={() => navigate('/signin')} className='signin-link-btn'>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

            {/* Toastify Container */}
            <ToastContainer />
        </div>
    );
};

export default SignupPage;
