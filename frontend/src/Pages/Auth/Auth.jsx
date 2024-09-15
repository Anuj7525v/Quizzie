import React, { useState } from 'react';
import styles from "./Auth.module.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';
import { BACKEND_URL } from '../../constant';






export default function Auth() {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
       
    });
    const [isSignUp, setIsSignUp] = useState(true);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmPass,setConfirmPass] = useState("");




    const validate = () => {
        const newErrors = {};

        if (isSignUp) {
            if (!data.username) {
                newErrors.username = "Invalid name";
            }
            if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
                newErrors.email = "Invalid email";
            }
            if (data.password.length < 6) {
                newErrors.password = "Weak Password";
            }
            if (data.password !== confirmPass) {
                newErrors.confirmPass = "Passwords do not match";
            }
        } else {
            // For login, only validate email and password
            if (!data.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
                newErrors.email = "Invalid email";
            }
            if (!data.password) {
                newErrors.password = "Password is required";
            }
        };

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;


    };

    const handleConfirmPassChange = (e) => {
        setConfirmPass(e.target.value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPass: ""
        }));
    };

    const handleChange = (e) => {

        //Update form data
        setData({ ...data, [e.target.name]: e.target.value });

        // Clear the error message as user types
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: ""
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            if (isSignUp) {
                try {
                    const response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
                        username: data.username,
                        email: data.email,
                        password: data.password
                    });
                    
                    
                    console.log(response.data);
                    toast.success("Register Successfully..");
                    setIsSignUp(false);
                    navigate('/login')



                } catch (error) {
                    console.log("Signup Error :", error);
                    toast.error("Signup failed!");
                }
            }
            else {

                try {
                    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
                        email: data.email,
                        password: data.password
                    });
                    
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("authId", response.data.authId);
                    dispatch(setUser({ token: response.data.token, authId: response.data.authId }));
                    console.log(response.data);
                    toast.success("Login Successfully.");
                    navigate('/home');

                }
                catch (error) {
                    console.error("Log IN error", error);
                    toast.error("Log In failed.")
                }

            }
        }
    };


    return (
        <>

            <div className={styles.Page}>
                <div className={styles.Box}>
                    <form onSubmit={handleSubmit} className={styles.form}>

                        <div className={styles.Header}>
                            <h1>QUIZZIE</h1>
                        </div>
                        <div className={styles.switcher}>
                            <span
                                className={`styles.btn1 ${isSignUp ? styles.active : ''}`}

                                onClick={() => (setIsSignUp(true), navigate("/signup"))}

                            >
                                Sign Up
                            </span>
                            <span
                                className={`styles.btn2 ${!isSignUp ? styles.active : ''}`}

                                onClick={() => (setIsSignUp(false), navigate('/login'))}

                            >
                                Log In
                            </span>
                        </div>

                        <div>
                            {isSignUp &&


                                <div className={styles.inputgroup}>
                                    <label htmlFor="username">Name</label>
                                    <input type="text"
                                        name='username's
                                        onChange={handleChange}
                                        value={data.username}
                                        className={errors.username ? styles.errorInput : ''} />
                                    <div className={styles.invalid}>
                                        {errors.username && <span className={styles.errorText}>{errors.username}</span>}
                                    </div>
                                </div>
                            }
                        </div>

                        <div className={styles.inputgroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                name='email'
                                onChange={handleChange}
                                value={data.email}
                                className={errors.email ? styles.errorInput : ''}
                            />
                            <div className={styles.invalid}>
                                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                            </div>

                        </div>

                        <div className={styles.inputgroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                name='password'
                                onChange={handleChange}
                                value={data.password}
                                className={errors.password ? styles.errorInput : ''}

                            />
                            <div className={styles.invalid}>
                                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                            </div>

                        </div>
                        <div>
                        {isSignUp && (
                            <div className={styles.inputgroup}>
                                <label htmlFor="confirmPass">Confirm Password</label>
                                <input type="password"
                                    name='confirmPass'
                                    onChange={handleConfirmPassChange}
                                    value={confirmPass}
                                    className={errors.confirmPass ? styles.errorInput : ''} />
                                <div className={styles.invalid}>
                                    {errors.confirmPass && <span className={styles.errorText}>{errors.confirmPass}</span>}
                                </div>
                            </div>
                        )}

                        </div>

                        <div className={styles.btn}>
                            <button className={styles.submitbutton} type='submit' >
                                {isSignUp ? "Sign Up" : "Login"}
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </>
    )
};

