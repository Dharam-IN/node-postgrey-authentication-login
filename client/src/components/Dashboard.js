import React from "react";

const Dashboard = ({setAuth})=>{
    return(
        <>
            Dashboard
            <button type="button" onClick={setAuth(false)}>Click</button>
        </>
    )
}

export default Dashboard;
