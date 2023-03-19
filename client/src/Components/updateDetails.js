import React from "react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css'; 
import { InputText } from "primereact/inputtext";
import  Password from './password';

export default function UpdateDetails() {
    return (<>
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
    </>   
    )
}