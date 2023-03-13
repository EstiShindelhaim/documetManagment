import React from "react";
import AllFiles from "./allFiles";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import './index.css';
import './flags.css';
const Home= ()=>
{
    return (
        <>
        <AllFiles></AllFiles>
        {/* <Menu model={items} /> */}
        </>
    )
}

export default Home;