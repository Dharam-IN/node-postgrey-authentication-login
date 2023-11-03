import React from "react";

const Login = ({setAuth})=>{
    return(
        <>
            <h1>Login</h1>
            <button type="button" onClick={()=>setAuth(true)}>Click</button>
        </>
    )
}

export default Login;
