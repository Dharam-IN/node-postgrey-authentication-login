import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = ({setAuth})=>{

    const [name, setname] = useState("")

    async function getName(){
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method: "GET",
                headers: {token: localStorage.token}
            })
            
            const parseRes = await response.json();
            // console.log(parseRes)

            setname(parseRes.user_name)
            toast('Welcome To Dashboard', {
                position: "top-center"
            });

        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = (e)=>{
        e.preventDefault();
        localStorage.removeItem("token")
        setAuth(false);
    }

    useEffect(()=>{
        getName();
    },[]);

    return(
        <>
            Dashboard 
            <h1>Welcome {name}</h1>
            <button type="button" onClick={e=>{logout(e)}}>Log Out</button>
            
            <ToastContainer />
        </>
    )
}

export default Dashboard;
