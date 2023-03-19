import React from "react";
import AddOfficer from "./popup";
import AllFiles from "./files";
import Menu from "./menu";
import Officers from "./officers/officers";


const Home= ()=>
{
    return (
        <>
        <Menu></Menu>
        <Officers></Officers>
        {/* <AllFiles></AllFiles> */}

        </>
    )
}

export default Home;