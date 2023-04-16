
import React, { useEffect, useState } from "react";
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useFunc } from "../Hooks/useFunc";
import { Button } from "primereact/button";
import useAxiosGet from "../Hooks/useGet"
import AutoCompleted from "./autoComplete";

export default function UpdateProfessionUnitDetails(props) {
    // const { data: d, loading: l, error: e, refetch: f } = useAxiosGet("professionUnit/byManager", 1);

    // const [name, setname] = useState('');
    const [daysForViewingClosedFile, setdaysForViewingClosedFile] = useState('');
    const [costOfFillingApplication, setCostOfFillingApplication] = useState('');
    const { updateData } = useFunc();

    const hundleSubmit = async () => {
        const professionToUpdae =
        {
            daysForViewingClosedFile: undefined,
            CostOfFillingApplication: undefined
        }
        if (daysForViewingClosedFile != '')
            professionToUpdae.daysForViewingClosedFile = parseInt(daysForViewingClosedFile)
        if (costOfFillingApplication != '')
            professionToUpdae.CostOfFillingApplication = parseInt(costOfFillingApplication)
        console.log(props.id);
        updateData("professionUnit", props.id, professionToUpdae)
    }




    return (<>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="daysForViewingClosedFile">מספר ימים לצפיה</label>
                <InputText id="daysForViewingClosedFile" aria-describedby="name-help" value={daysForViewingClosedFile} onChange={(e) => setdaysForViewingClosedFile(e.target.value)} />
            </div>
        </div>
        <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
                <label htmlFor="daysForViewingClosedFile">מחיר למילוי הבקשה</label>
                <InputText id="costOfFillingApplication" aria-describedby="name-help" value={costOfFillingApplication} onChange={(e) => setCostOfFillingApplication(e.target.value)} />
            </div>
        </div>

        <Button label="אישור" icon="pi pi-check" id={props.id} onClick={hundleSubmit}></Button>
    </>
    )
}