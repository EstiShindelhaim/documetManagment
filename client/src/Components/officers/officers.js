import React from "react";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import Grid from "../../service/grid";
import PopUp from "../../service/popup";
import AddOfficer from"./addOfficers"
import { ProductService } from '../../service/officersAxios';

const Officers=()=>{
return(<>

<Grid title="הפקידים שלי" popup={<PopUp content={<AddOfficer></AddOfficer>} ></PopUp>} productService={ProductService}></Grid>
</>)


}
export default Officers;