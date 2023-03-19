import React from "react";
import './addOfficers.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css'; 
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import AutoCompleted from "../autoComplete";
import MyButton from "../button";


export default function AddOfficers() {
    return (<>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="id">מס' זהות</label>
                <InputText id="id" aria-describedby="id-help" />
            </div>
        </div>
        <div className="card flex justify-content-center">
        <div className="flex flex-column gap-2">
            <label htmlFor="name">שם</label>
            <InputText id="name" aria-describedby="name-help" />
        </div>
    </div>
    <div className="card flex justify-content-center">
        <div className="flex flex-column gap-2">
            <label htmlFor="password">סיסמה</label>
            <Password></Password>
        </div>
    </div>
    <div className="card flex justify-content-center">
        <div className="flex flex-column gap-2">
            <label htmlFor="password">אשר סיסמה</label>
            <InputText id="password" aria-describedby="password-help" />
        </div>
    </div>
    <div className="card flex justify-content-center">
        <div className="flex flex-column gap-2">
            <label htmlFor="mail">אימייל</label>
            <InputText id="mail" aria-describedby="mail-help" />
        </div>
    </div>
    <div className="card flex justify-content-center">
        <div className="flex flex-column gap-2">
            <label htmlFor="numOfDocuments">מס' קבצים מאושר</label>
            <InputText id="numOfDocuments" aria-describedby="numOfDocuments-help" />
        </div>
    </div>
    <div className="card flex justify-content-center">
        <div className="flex flex-column gap-2">
            <label htmlFor="professionUnitId">יחידת מקצוע</label>
            <AutoCompleted></AutoCompleted>
        </div>
    </div>
    <MyButton label="אישור" icon="pi pi-check"></MyButton>
    </>   
    )
}
        