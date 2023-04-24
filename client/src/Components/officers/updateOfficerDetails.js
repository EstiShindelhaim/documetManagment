
import React, { useEffect, useState , useContext} from "react";
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
import Submit from "../submit";
import UserContext from "../User/UserContext"

export default function UpdateOfficerDetails(props) {
    const user = useContext(UserContext);
    const { getData, postData } = useFunc();
    const { data: d, loading: l, error: e, refetch: f } = useAxiosGet("professionUnit/byManager", user.idmanager);
    const [name, setname] = useState(props.name);
    console.log("props.name",props.name,"props.mail",props.mail,"props.professionUnit",props.professionUnit,"props.numOfDocuments",props.numOfDocuments);
    const [mail, setmail] = useState(props.mail);
    const [professionUnitId, setProfessionUnitId] = useState(props.professionUnit);
    const [numOfDocuments, setnumOfDocuments] = useState(props.numOfDocuments);
    const { updateData } = useFunc();
    const [notValidMail, setNotValidMail] = useState(false);
    const [notValidPassword, setNotValidPassword] = useState(false);
    const [notValidDocuments, setNotValidDocuments] = useState(false);

    const hundleSubmit = async () => {
        if (mail != '' && !mail.endsWith('@gmail.com')) {
            if (!notValidMail) setNotValidMail(true);
            if (notValidDocuments) setNotValidDocuments(false);
            return;
        }
        if (notValidMail) setNotValidMail(false);
        const { data, loading, error, refetch } = await getData("manager/numOfDocumentsForOfficer",user.idmanager)
        const num = data.num
        if (numOfDocuments != '' && num + props.numOfDocuments < parseInt(numOfDocuments)) {
            if (!notValidDocuments) setNotValidDocuments(true);
            return;
        }
        if (notValidDocuments) setNotValidDocuments(false);
        let professionUnit = d.filter((p => p.name == professionUnitId))
        const officerToUpdae =
        {
            professionUnitId: undefined,
            name: undefined,
            mail: undefined,
            numOfDocuments: undefined

        }
        if (name != '')
            officerToUpdae.name = name
       
        if (professionUnitId != '')
            officerToUpdae.professionUnitId = professionUnit[0].idprofession_unit
        if (mail != '')
            officerToUpdae.mail = mail
        if (numOfDocuments != '')
            officerToUpdae.numOfDocuments = parseInt(numOfDocuments)
        console.log(props.id);
        await updateData("officer", props.id, officerToUpdae);

        props.setVisible(false)

        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("officer/byManager", user.idmanager);
        props.setProducts(pr);

        props.toast.current.show({severity:'success', summary: 'Success', detail:'הפקיד עודכן בהצלחה', life: 1500});
    }




    return (<>
    <div style={{direction:"rtl"}}>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="name">שם</label>
                <InputText id="name" aria-describedby="name-help" value={name} onChange={(e) => setname(e.target.value)} />
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="mail">אימייל</label>
                <InputText id="mail" aria-describedby="mail-help" value={mail} onChange={(e) => setmail(e.target.value)} />
                {notValidMail && <span style={{ color: "red" }}>כתובת מייל לא חוקית</span>}
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="numOfDocuments">מס' קבצים מאושר</label>
                <InputText id="numOfDocuments" aria-describedby="numOfDocuments-help" value={numOfDocuments} onChange={(e) => setnumOfDocuments(e.target.value)} />
                {notValidDocuments && <span style={{ color: "red" }}>מדי הרבה מסמכים מאושרים</span>}
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="professionUnitId">יחידת מקצוע</label>
                <AutoCompleted id="professionUnitId" value={professionUnitId} managerId={user.idmanager} url={"professionUnit/byManager"} params={user.idmanager} setValue={setProfessionUnitId}></AutoCompleted>
            </div>
        </div>
        </div>
        <br></br>

        {/* <Button label="אישור" icon="pi pi-check" id={props.id} onClick={hundleSubmit}></Button> */}
        <Submit function={hundleSubmit} current={{name:props.name,
                                                    mail:props.mail,
                                                    professionUnit:props.professionUnit,
                                                    numOfDocuments:props.numOfDocuments}}
                                        new={{name:props.name,
                                                    mail:mail,
                                                    professionUnit:professionUnitId,
                                                    numOfDocuments:numOfDocuments}}></Submit>
    </>
    )
}