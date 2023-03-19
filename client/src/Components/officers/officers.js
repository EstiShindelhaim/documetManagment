import React from "react";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import Grid from "../grid";
import PopUp from "../popup";
import AddOfficer from"./addOfficers"
import { ProductService } from '../officersAxios';

const Officers=()=>{
return(<>
{/* 
בשביל שיהיה בשמאל ולא במרכז צריך שבאבא
justify-content: flex-end !important;
} */}
<Grid style={{marginLeft:"50px"}} title="הפקידים שלי" popup={<PopUp label="הוסף פקיד חדש" icon="pi pi-user-plus" header="הכנס פרטי פקיד" content={<AddOfficer></AddOfficer>} ></PopUp>} productService={ProductService}></Grid>
</>)


}
export default Officers;