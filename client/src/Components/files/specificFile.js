import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import Grid from "../grid";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import useAxiosGet from "../../Hooks/useGet"
import { useFunc } from "../../Hooks/useFunc";
import { SelectButton } from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';
import { useParams } from 'react-router-dom';


const SpecificFiles = () => {
    const params=useParams()
    const idfile=params.id;
    return(<>
    <h1>{idfile}</h1>
    </>)
}
export default SpecificFiles;
