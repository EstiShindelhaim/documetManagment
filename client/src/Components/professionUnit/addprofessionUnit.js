import React, { useEffect, useState , useRef, useContext} from "react";
// import './addOfficers.css'
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
import { Toast } from 'primereact/toast';
import UserContext from "../User/UserContext"

const AddProfessionUnit = (props) => {
    const user = useContext(UserContext);
    const { getData, postData } = useFunc();
    const hundleSubmit = async () => {
         const  professionUnit =
         {
            name: name,
            daysForViewingClosedFile: daysForViewingClosedFile,
            costOfFillingApplication:costOfFillingApplication,
        }
        console.log(professionUnit);
       await postData(`professionUnit/${user.idmanager}`,professionUnit);

       props.setVisible(false);

       let { data:pr, loading:prl, error:pre, refetch:prr } =await getData("professionUnit/byManager", user.idmanager);
       props.setProducts(pr);

       props.toast.current.show({severity:'success', summary: 'Success', detail:'היחידה נוספה בהצלחה', life: 1500});
                 
    }
    const [name, setname] = useState('');
    const [daysForViewingClosedFile, setdaysForViewingClosedFile] = useState('');
    const [costOfFillingApplication, setCostOfFillingApplication] = useState('');
    // if(l)
    // return (<p>louding</p>)
    return (<>
    {/* //    // //{data=fillData()} */}
       
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="name">שם</label>
                <InputText id="name" aria-describedby="name-help" value={name} onChange={(e) => setname(e.target.value)} />
            </div>
        </div>
        <br></br>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="daysForViewingClosedFile">מס' ימים לצפיה במסמך</label>
                <InputText id="daysForViewingClosedFile" aria-describedby="daysForViewingClosedFile-help" value={daysForViewingClosedFile} onChange={(e) => setdaysForViewingClosedFile(e.target.value)}/>
                {/* {notValidMail && <span style={{ color: "red" }}>כתובת מייל לא חוקית</span>} */}
            </div>
        </div>
        <br></br>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="CostOfFillingApplication">מחיר לבקשה</label>
                <InputText id="CostOfFillingApplication" aria-describedby="CostOfFillingApplication-help" value={costOfFillingApplication} onChange={(e) => setCostOfFillingApplication(e.target.value)}/>
                {/* {notValidDocuments && <span style={{ color: "red" }}>מדי הרבה מסמכים מאושרים</span>} */}
            </div>
        </div>
        {/* <Toast ref={toast} /> */}
        <Button label="אישור" icon="pi pi-check" onClick={hundleSubmit}></Button>
    </>
    )
}
export default AddProfessionUnit;
