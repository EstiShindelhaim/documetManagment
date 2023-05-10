
import React, { useEffect, useState, useRef, useContext } from "react";
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

const AddOfficers = (props) => {
    // const us=localStorage.getItem("user")
    // const user=JSON.parse(us)
    const user = useContext(UserContext);
    const { getData, postData } = useFunc();
    const { data: d, loading: l, error: e, refetch: f } = useAxiosGet("professionUnit/byManager", user.idmanager);
    // const toast = useRef(null);
    const [notValidAll, setNotValidAll] = useState(false);
    const [notValidMail, setNotValidMail] = useState(false);
    const [notValidId, setNotValidId] = useState(false);
    const [notValidPassword, setNotValidPassword] = useState(false);
    const [notValidDocuments, setNotValidDocuments] = useState(false);

    const [id, setId] = useState('');
    const [professionUnitId, setProfessionUnitId] = useState('');
    const [name, setname] = useState('');
    const [password1, setpassword1] = useState('');
    const [password2, setpassword2] = useState('');
    const [mail, setmail] = useState('');
    const [numOfDocuments, setnumOfDocuments] = useState('');
    if (l)
        return (<p>louding</p>)

    const validId = (value) => {
        if (value.length != 9)
            return false;
        let sum = 0;
        let ss = 0;
        let a = value.split("");
        let i = 0;
        for (i = 0; i < a.length - 1; i += 2) {
            sum += parseInt(a[i]);
        }
        for (i = 1; i < a.length - 1; i += 2) {
            ss = 2 * parseInt(a[i]);
            if (ss > 9) {
                ss = 1 + ss % 10;
            }
            sum += ss;
        }
        if (sum % 10 != 0)
            // if(parseInt(a[a.length-1])!=(10-sum%10))
            return false;
        return true;
    }

    function checkEmail(val) {
        if (!val.match(/\S+@\S+\.\S+/)) { // Jaymon's / Squirtle's solution
            // Do something
            return false;
        }
        if (val.indexOf(' ') != -1 || val.indexOf('..') != -1) {
            // Do something
            return false;
        }
        return true;
    }

    const hundleSubmit = async () => {
        if (!id || !name || !password1 || !password2 || !mail || !numOfDocuments) {
            if (!notValidAll) setNotValidAll(true);
            if (notValidId) setNotValidId(false);
            if (notValidPassword) setNotValidPassword(false);
            if (notValidMail) setNotValidMail(false);
            if (notValidDocuments) setNotValidDocuments(false);
            return;
        }
        if (notValidAll) setNotValidAll(false);
        if (!validId(id)) {
            if (!notValidId) setNotValidId(true);
            if (notValidPassword) setNotValidPassword(false);
            if (notValidMail) setNotValidMail(false);
            if (notValidDocuments) setNotValidDocuments(false);
            return;
        }
        if (notValidId) setNotValidId(false);
        if (password1 != password2) {
            if (!notValidPassword) setNotValidPassword(true);
            if (notValidMail) setNotValidMail(false);
            if (notValidDocuments) setNotValidDocuments(false);
            return
        }
        if (notValidPassword) setNotValidPassword(false);
        if (!checkEmail(mail)) {
            if (!notValidMail) setNotValidMail(true);
            if (notValidDocuments) setNotValidDocuments(false);
            return;
        }
        if (notValidMail) setNotValidMail(false);
        const { data, loading, error, refetch } = await getData("manager/numOfDocumentsForOfficer", user.idmanager)
        const num = data.num
        if (num < parseInt(numOfDocuments)) {
            if (!notValidDocuments) setNotValidDocuments(true);
            return;
        }
        if (notValidDocuments) setNotValidDocuments(false);
        let professionUnit = d.filter((p => p.name == professionUnitId))
        const officer =
        {
            managerId: user.idmanager,
            professionUnitId: professionUnit[0].idprofession_unit,
            idNumber: parseInt(id),
            name: name,
            password: password1,
            mail: mail,
            numOfDocuments: parseInt(numOfDocuments)
        }
        console.log(officer);
        await postData("officer", officer);

        props.setVisible(false);

        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("officer/byManager", user.idmanager);
        props.setProducts(pr);

        props.toast.current.show({ severity: 'success', summary: 'Success', detail: 'הפקיד נוסף בהצלחה', life: 1500 });

    }

    return (<>
        {/* //    // //{data=fillData()} */}
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="id">מס' זהות</label>
                <InputText id="id" aria-describedby="id-help" value={id} keyfilter="int" onChange={(e) => setId(e.target.value)} />
                {notValidId && <span style={{ color: "red" }}>מס' זהות לא תקין</span>}
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
                <Password id="password1" value={password1} onChange={(e) => setpassword1(e.target.value)}></Password>
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="password2">אשר סיסמה</label>
                <Password id="password2" value={password2} onChange={(e) => setpassword2(e.target.value)}></Password>
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
                <AutoCompleted id="professionUnitId" value={professionUnitId} managerId={user.idmanager} url={"professionUnit/byManager"} params={user.idmanager} setValue={setProfessionUnitId}></AutoCompleted>
                {notValidAll && <span style={{ color: "red" }}>נא למלא את כל השדות</span>}
            </div>
        </div>
        {/* <Toast ref={toast} /> */}
        <Button label="אישור" icon="pi pi-check" onClick={hundleSubmit}></Button>

    </>
    )
}
export default AddOfficers;
