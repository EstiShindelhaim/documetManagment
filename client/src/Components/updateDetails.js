
import React, { useEffect, useState } from "react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css'; 
import { InputText } from "primereact/inputtext";
import  Password from './password';
import { useFunc } from"../Hooks/useFunc";
import { Button } from "primereact/button";

export default function UpdateDetails() {


    const [name, setname] = useState('');
    const [password1, setpassword1] = useState('');
    const [password2, setpassword2] = useState('');
    const [mail, setmail] = useState('');
    const { updateData} = useFunc();
    
        const hundleSubmit = async () => {
            if(password1!='' && password1!=password2)
            {
                alert("אשר סיסמה שנית")
                return
            }
            if(!mail.endsWith('@gmail.com'))
            { 
                alert("כתובת מייל לא חוקית")
                return;
            }
           
             const managerToUpdae =
             {

                idNumber:1,
                name: undefined,
                password: undefined,
                mail: undefined,
            }
            if(name!='')
            managerToUpdae.name=name
            if(password1!='')
            managerToUpdae.password1=password1
            if(mail!='')
            managerToUpdae.mail=mail
            updateData("manager",1,managerToUpdae)
        }




    return (<>
         <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="name">שם</label>
                <InputText id="name" aria-describedby="name-help" value={name} onChange={(e) => setname(e.target.value)} />
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="password1">סיסמה</label>
                <Password id="password1"value={password1} onChange={(e) => setpassword1(e.target.value)}></Password>
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="password2">אשר סיסמה</label>
                <InputText id="password2" aria-describedby="password-help" value={password2} onChange={(e) => setpassword2(e.target.value)} />
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="mail">אימייל</label>
                <InputText id="mail" aria-describedby="mail-help" value={mail} onChange={(e) => setmail(e.target.value)}/>
            </div>
        </div>
        <Button label="אישור" icon="pi pi-check" onClick={hundleSubmit}></Button>
    </>   
    )
}