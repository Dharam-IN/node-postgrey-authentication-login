import React, { useEffect, useState } from "react";

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
            Dashboard{name}
            <button type="button" onClick={e=>{logout(e)}}>Log Out</button>
        </>
    )
}

export default Dashboard;
