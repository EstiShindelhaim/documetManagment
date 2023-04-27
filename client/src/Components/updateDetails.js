
import React, { useEffect, useState } from "react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useFunc } from "../Hooks/useFunc";
import { Button } from "primereact/button";

export default function UpdateDetails(props) {


    const [name, setname] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [mail, setmail] = useState('');
    const { updateData } = useFunc();
    const [notValidMail, setNotValidMail] = useState(false);
    const [notValidPassword, setNotValidPassword] = useState(false);
    const hundleSubmit = async () => {
        console.log(password1,"password1",password2,"password2");
        const managerToUpdae =
        {
            idNumber: 1,
            name: undefined,
            password: undefined,
            mail: undefined,
        }
        if (name != ''){
            managerToUpdae.name = name
        }
            
        if (password1 != '' || password2 != '') {
            console.log(password1,"password1",password2,"password2");
            if (password1 != password2) {
                if(!notValidPassword) setNotValidPassword(true);
                if(notValidMail) setNotValidMail(false);
                return;
            }
            if(notValidPassword) setNotValidPassword(false);
            managerToUpdae.password = password1
        }

        if (mail != '') {
            if (!mail.endsWith('@gmail.com')) {
                if(!notValidMail) setNotValidMail(true);
                return;
            }  
            managerToUpdae.mail = mail
        }
        if(notValidMail) setNotValidMail(false);
        updateData("manager", 1, managerToUpdae);

        props.setVisible(false);

        props.toast.current.show({severity:'success', summary: 'Success', detail:'הפרטים עודכנו בהצלחה', life: 1500});
    }




    return (<>
    <div style={{direction:"rtl"}}>
        <div className="card flex justify-content-center" >
            <div className="flex flex-column gap-2">
                <label htmlFor="name">שם</label>
                <InputText id="name" aria-describedby="name-help" value={name} onChange={(e) => setname(e.target.value)} />
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="password1">סיסמה</label>
                <Password id="password1" value={password1} onChange={(e) => setPassword1(e.target.value)}></Password>
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="password2">אשר סיסמה</label>
                <Password id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}></Password>
                {notValidPassword && <span style={{ color: "red" }}>אשר סיסמה שנית</span>}
            </div>         
        </div>   
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="mail">אימייל</label>
                <InputText id="mail" aria-describedby="mail-help" value={mail} onChange={(e) => setmail(e.target.value)} />
                {notValidMail && <span style={{ color: "red" }}>כתובת מייל לא חוקית</span>}
            </div> 
            
        </div>  
        </div>
        <Button label="אישור" icon="pi pi-check" onClick={hundleSubmit}></Button>
        
    </>
    )
}