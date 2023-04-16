import React from "react";
import AddOfficer from "./popup";
import AllFiles from "./files";
import Menu from "./menu";
import Officers from "./officers/officers";
import Profession_unit from "./professionUnit/professionUnit";


const Home= ()=>
{
    return (
        <>
        <Officers></Officers>
        {/* <AllFiles></AllFiles> */}
        {/* <Profession_unit></Profession_unit> */}
        </>
    )
}

export default Home;