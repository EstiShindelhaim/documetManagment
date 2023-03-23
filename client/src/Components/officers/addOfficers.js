import React, { useEffect, useState } from "react";
import './addOfficers.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import AutoCompleted from "../autoComplete";
import MyButton from "../button";
import { useGet } from "../../Hooks/useGet"
import { Button } from "primereact/button";
import { useFunc } from "../../Hooks/useFunc";
import useAxiosGet from "../../Hooks/useGet"



const AddOfficers = () => {
    const { getData, postData } = useFunc();
    const {data:d, loading:l, error:e, refetch:f} = useAxiosGet("professionUnit/byManager",1);
    const hundleSubmit = async () => {
        if(!id || !name || !password1 || !password2 || !mail || !numOfDocuments)
        {
            alert("נא למלא את כל השדות")
            console.log(id,"id",name,"name",password1,"password1",password2,"password2",mail,"mail",numOfDocuments,"numOfDocuments");
            return;
        }
        if(password1!=password2)
        {
            alert("אשר סיסמה שנית")
            return
        }
        if(!mail.endsWith('@gmail.com'))
        { 
            alert("כתובת מייל לא חוקית")
            return;
        }
        const {data, loading, error, refetch} =await getData("manager/numOfDocumentsForOfficer",1)
        const num=data.num
        if(num<parseInt(numOfDocuments))
        {
            console.log(numOfDocuments,num);
            alert("מדי הרבה מסמכים מאושרים");
            return;
        }
         
        let professionUnit=d.filter((p=>p.name==professionUnitId))
         const officer =
         {
            managerId: 1,
            professionUnitId:professionUnit[0].idprofession_unit,
            idNumber: parseInt(id),
            name: name,
            password: password1,
            mail: mail,
            numOfDocuments: parseInt(numOfDocuments)
        }
        console.log(officer);
       postData("officer",officer)
    
    }

    const [id, setId] = useState('');
    const [professionUnitId, setProfessionUnitId] = useState('');
    const [name, setname] = useState('');
    const [password1, setpassword1] = useState('');
    const [password2, setpassword2] = useState('');
    const [mail, setmail] = useState('');
    const [numOfDocuments, setnumOfDocuments] = useState('');
    if(l)
    return (<p>louding</p>)
    return (<>
    {/* //    // //{data=fillData()} */}
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="id">מס' זהות</label>
                <InputText id="id" aria-describedby="id-help" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
        </div>
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
                <Password id="password1"value={password2} onChange={(e) => setpassword2(e.target.value)}></Password>
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
export default AddOfficers;
