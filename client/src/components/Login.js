import React, { useState } from "react";
import { Link } from "react-router-dom"
import "./css/forms.css";
import img1 from "./images/upflair.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = { email, password }

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()
            // console.log(parseRes)

            if(parseRes.token){
                localStorage.setItem("token", parseRes.token)

                setAuth(true)
                // toast.success("Loged successfully")
                toast('Login Successfully', {
                    position: "top-center"
                });
            }else{
                setAuth(false);
                // toast.error(parseRes);
                // console.log("wronf username and pass")
                toast.error('Password or email is incorrect', {
                    position: "top-center"
                });
            }
            
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <div className="main_div_bg">
                <div>
                    <img src={img1} alt="img" className="upflair" />
                </div>
                <section className="index">
                    <div className="portfolio">
                        <div className="form-style">
                            <form onSubmit={onSubmitForm}>
                                <div>
                                    <div className="lab_icn">
                                        <i className="fa-solid fa-envelope" />
                                        <label>
                                            e-mail
                                        </label>
                                    </div>
                                    <input type="email" className="form-control my-3" name="email" value={email} placeholder="email" onChange={e => onChange(e)} id="mail" />
                                </div>
                                <div>
                                    <div className="lab_icn">
                                        <i className="fa-solid fa-shield-halved" />
                                        <label> password </label>
                                    </div>
                                    <input type="password" className="form-control my-3" name="password" value={password} placeholder="password" onChange={e => onChange(e)} id="password" />
                                </div>
                                <div className="sub-flex">
                                    <div>
                                        <button type="submit" className="btn btn-success d-block">Submit</button>
                                    </div>
                                    <div>
                                        <a href="/" className="ancor">
                                            forgot password
                                        </a>
                                    </div>
                                    <Link to="/register">Register</Link>
                                </div>
                            </form>
                            <div className="login">
                                <div>
                                    <h1>for employee</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login;
