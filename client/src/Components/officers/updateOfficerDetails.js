
import React, { useEffect, useState } from "react";
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

export default function UpdateOfficerDetails(props) {
    const { getData, postData } = useFunc();
    const { data: d, loading: l, error: e, refetch: f } = useAxiosGet("professionUnit/byManager", 1);

    const [name, setname] = useState('');
    const [password1, setpassword1] = useState('');
    const [password2, setpassword2] = useState('');
    const [mail, setmail] = useState('');
    const [professionUnitId, setProfessionUnitId] = useState('');
    const [numOfDocuments, setnumOfDocuments] = useState('');
    const { updateData } = useFunc();
    const [notValidMail, setNotValidMail] = useState(false);
    const [notValidPassword, setNotValidPassword] = useState(false);
    const [notValidDocuments, setNotValidDocuments] = useState(false);

    const hundleSubmit = async () => {
        if (password1 != password2) {
            if (!notValidPassword) setNotValidPassword(true);
            if (notValidMail) setNotValidMail(false);
            if (notValidDocuments) setNotValidDocuments(false);
            return
        }
        if (notValidPassword) setNotValidPassword(false);
        if (mail != '' && !mail.endsWith('@gmail.com')) {
            if (!notValidMail) setNotValidMail(true);
            if (notValidDocuments) setNotValidDocuments(false);
            return;
        }
        if (notValidMail) setNotValidMail(false);
        const { data, loading, error, refetch } = await getData("manager/numOfDocumentsForOfficer", 1)
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
            password: undefined,
            mail: undefined,
            numOfDocuments: undefined

        }
        if (name != '')
            officerToUpdae.name = name
        if (password1 != '')
            officerToUpdae.password = password1
        if (professionUnitId != '')
            officerToUpdae.professionUnitId = professionUnit[0].idprofession_unit
        if (mail != '')
            officerToUpdae.mail = mail
        if (numOfDocuments != '')
            officerToUpdae.numOfDocuments = parseInt(numOfDocuments)
        console.log(props.id);
        await updateData("officer", props.id, officerToUpdae);

        props.setVisible(false)

        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("officer/byManager", 1);
        props.setProducts(pr);

        props.toast.current.show({severity:'success', summary: 'Success', detail:'הפקיד עודכן בהצלחה', life: 2000});
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
                <Password id="password1" value={password1} onChange={(e) => setpassword1(e.target.value)}></Password>
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="password2">אשר סיסמה</label>
                <Password id="password2" aria-describedby="password-help" value={password2} onChange={(e) => setpassword2(e.target.value)} />
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
                <AutoCompleted id="professionUnitId" value={professionUnitId} managerId={1} url={"professionUnit/byManager"} params={1} setValue={setProfessionUnitId}></AutoCompleted>
            </div>
        </div>

        <Button label="אישור" icon="pi pi-check" id={props.id} onClick={hundleSubmit}></Button>
    </>
    )
}