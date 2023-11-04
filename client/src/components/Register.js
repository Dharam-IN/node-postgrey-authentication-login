import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/forms.css";
import img1 from "./images/upflair.png";

const Register = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    })

    const { email, password, name } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async e => {
        e.preventDefault();

        try {

            const body = { email, password, name };

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()
            // console.log(parseRes)
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            {/* <h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" value={email} placeholder="email" onChange={e=>{onChange(e)}} className="form-control my-3"/>
                <input type="password" name="password" value={password} placeholder="password" onChange={e=>{onChange(e)}} className="form-control my-3"/>
                <input type="text" name="name" value={name} placeholder="name" onChange={e=>{onChange(e)}} className="form-control my-3"/>
                <button type="submit" className="btn btn-success d-block">Submit</button>
                <Link to="/login">Login</Link>
            </form> */}

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
                                        <i className="fa-solid fa-user" />
                                        <label>
                                            full name
                                        </label>
                                    </div>
                                    <input type="text" name="name" value={name} placeholder="name" onChange={e => onChange(e)} className="form-control fname" id="fname" />
                                </div>
                                <div>
                                    <div className="lab_icn">
                                        <i className="fa-solid fa-envelope" />
                                        <label>
                                            e-mail
                                        </label>
                                    </div>
                                    <input type="email" name="email" value={email} placeholder="email" onChange={e => onChange(e)} className="form-control fname" id="mail" />
                                </div>
                                <div>
                                    <div className="lab_icn">
                                        <i className="fa-solid fa-shield-halved" />
                                        <label>
                                            password
                                        </label>
                                    </div>
                                    <input type="password" name="password" value={password} placeholder="password" onChange={e => onChange(e)} className="form-control fname" id="password" />
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
                                    <Link to="/login">Login</Link>
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
        </>
    )
}

export default Register;
