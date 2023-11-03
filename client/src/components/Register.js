import React, { useState } from "react";

const Register = ()=>{

    const [inputs, setInputs] = useState({
        email: "Pig",
        password: "12345",
        name: "pigji"
    })

    const {email, password, name} = inputs;

    return(
        <>
            <h1>Register</h1>
            <form>
                <input type="email" name="email" value={email} placeholder="email" className="form-control my-3"/>
                <input type="password" name="password" placeholder="password" className="form-control my-3"/>
                <input type="text" name="name" placeholder="name" className="form-control my-3"/>
                <button type="submit" className="btn btn-success d-block">Submit</button>
            </form>
        </>
    )
}

export default Register;
