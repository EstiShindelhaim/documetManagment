
import React, { useEffect, useState, useContext } from "react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useFunc } from "../../Hooks/useFunc";
import { Button } from "primereact/button";
import useAxiosGet from "../../Hooks/useGet"
import AutoCompleted from "../autoComplete";
import Submit from "../submit"
import UserContext from "../User/UserContext"

export default function UpdateProfessionUnitDetails(props) {
    const user = useContext(UserContext);
    const { getData, updateData } = useFunc();
    // const { data: d, loading: l, error: e, refetch: f } = useAxiosGet("professionUnit/byManager", 1);
    const [name, setname] = useState(props.name);
    // console.log("props.name",props.name,"props.mail",props.mail,"props.professionUnit",props.professionUnit,"props.numOfDocuments",props.numOfDocuments);
    const [costOfFillingApplication, setCostOfFillingApplication] = useState(props.costOfFillingApplication);
    const [daysForViewingClosedFile, setdaysForViewingClosedFile] = useState(props.daysForViewingClosedFile);
    const [id, setId] = useState(props.id);
    const hundleSubmit = async () => {
        const professionUnitToUpdae =
        {
            name: name,
            costOfFillingApplication: costOfFillingApplication,
            daysForViewingClosedFile: daysForViewingClosedFile

        }

        await updateData("professionUnit", id, professionUnitToUpdae);

        props.setVisible(false)

        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("professionUnit/byManager",user.idmanager);
        props.setProducts(pr);

        props.toast.current.show({severity:'success', summary: 'Success', detail:'היחידה עודכנה בהצלחה', life: 1500});
    }




    return (<>
    <div style={{direction:"rtl"}}>
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
        </div>
        <br></br>

        {/* <Button label="אישור" icon="pi pi-check" id={props.id} onClick={hundleSubmit}></Button> */}
        <Submit function={hundleSubmit} /*current={{name:props.name,
                                                    mail:props.mail,
                                                    professionUnit:props.professionUnit,
                                                    numOfDocuments:props.numOfDocuments}}
                                        new={{name:props.name,
                                                    mail:mail,
                                                    professionUnit:professionUnitId,
                                                    numOfDocuments:numOfDocuments}}*/></Submit>
    </>
    )
}