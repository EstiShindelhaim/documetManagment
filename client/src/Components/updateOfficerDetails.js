
import React, { useEffect, useState } from "react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css'; 
import { InputText } from "primereact/inputtext";
import  Password from './password';
import { useFunc } from"../Hooks/useFunc";
import { Button } from "primereact/button";
import useAxiosGet from "../../Hooks/useGet"

export default function UpdateOfficerDetails() {
    const { getData, postData } = useFunc();
    const {data:d, loading:l, error:e, refetch:f} = useAxiosGet("professionUnit/byManager",1);

    const [name, setname] = useState('');
    const [password1, setpassword1] = useState('');
    const [password2, setpassword2] = useState('');
    const [mail, setmail] = useState('');
    const [professionUnitId, setProfessionUnitId] = useState('');
    const [numOfDocuments, setnumOfDocuments] = useState('');
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
            // const {data, loading, error, refetch} =await getData("manager/numOfDocumentsForOfficer",1)
            // const num=data.num
            // if(num<parseInt(numOfDocuments))
            // {
            //     console.log(numOfDocuments,num);
            //     alert("מדי הרבה מסמכים מאושרים");
            //     return;
            // }
            let professionUnit=d.filter((p=>p.name==professionUnitId))
             const officerToUpdae =
             {

                idNumber:1,
                professionUnitId:undefined,
                name: undefined,
                password: undefined,
                mail: undefined,

            }
            if(name!='')
            officerToUpdae.name=name
            if(password1!='')
            officerToUpdae.password1=password1
            if(professionUnitId!='')
            officerToUpdae.professionUnit[0].idprofession_unit
            if(mail!='')
            officerToUpdae.mail=mail
            updateData("manager",1,officerToUpdae)
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
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="numOfDocuments">מס' קבצים מאושר</label>
                <InputText id="numOfDocuments" aria-describedby="numOfDocuments-help" value={numOfDocuments} onChange={(e) => setnumOfDocuments(e.target.value)}/>
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="professionUnitId">יחידת מקצוע</label>
                <AutoCompleted id="professionUnitId"value={professionUnitId}managerId={1}url={"professionUnit/byManager"}params={1} setValue={setProfessionUnitId}></AutoCompleted>
            </div>
        </div>

        <Button label="אישור" icon="pi pi-check" onClick={hundleSubmit}></Button>
    </>   
    )
}