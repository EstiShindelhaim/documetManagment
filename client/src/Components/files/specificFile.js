import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import Grid from "../grid";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import useAxiosGet from "../../Hooks/useGet"
import { useFunc } from "../../Hooks/useFunc";
import { SelectButton } from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import PopUp from "../popup";
import Progress from './progress';
import Result from './documents';

const SpecificFiles = () => {
    const [visible, setVisible] = useState(false);
    const params = useParams()
    const idfile = params.id;
    const { data, loading, error, refetch } = useAxiosGet("file", idfile);
    const { data: dStatuses, loading: lStatuses, error: eStatuses, refetch: rStatuses } = useAxiosGet("status");
    const { getData, postData, updateData, deteteData } = useFunc();
    const [statusId, setStatusId] = useState(3);

    useEffect(() => {
        if (dStatuses) {
            console.log("dStatuses", dStatuses);
            setStatusId(dStatuses.filter(e => e.name == 'נסגר ע"י המנהל')[0].idstatus);
            console.log("statusId", statusId);        
        }

    }, [dStatuses]);

    if (loading) return <p>loading</p>

    const getSeverity = (product) => {
        switch (product.result) {
            case 1:
                return 'success';

            case 0:
                return 'danger';

            case 'undefined':
                return 'warning';

            default:
                return null;
        }
    };

    const closeProd = async (id) => {
        console.log("statusId", statusId);
        const body = { "statusId": statusId }
        console.log("idddddddddddddddddddddddddddddddddd", id);
        await updateData("file", id, body);
        refetch();
        // toast.current.show({ severity: 'success', summary: 'Success', detail: 'התיק נסגר בהצלחה', life: 1500 });
    }

    return (<>
        <div className="card">
            <Card title="פרטי התיק" style={{ width: "70%", marginRight: "15%", textAlign: "center" }}>

                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <div className="flex align-items-center gap-2">
                                <Tag value="תוצאת התיק" severity={getSeverity(data)}></Tag>
                            </div>
                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            <h4 className="mt-0 mb-3">מגיש התיק:</h4>
                            <Tag value={data.name}></Tag>
                            <h4 className="mb-1">סטטוס: {data.statusName}</h4>
                            {/* <h4 className="mb-1">תאריך פתיחת התיק: {product.openDate}</h4> */}
                            <h4 className="mt-0 mb-3">פקיד מטפל: {data.officerName}</h4>
                            <h4 className="mt-0 mb-3">תאריך הגשת התיק: {data.ApplicationSubmissionDate}</h4>
                            <h5 className="mt-0 mb-3">הערות: {data.remarks || "---"}</h5>
                            <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                                <Button onClick={() => { closeProd(data.idfile) }} icon="pi pi-lock" className="p-button p-button-rounded" tooltip='סגירת התיק' />
                                <Button icon="pi pi-send" className="p-button p-button-rounded" tooltip='שלח לבדיקה' />
                                <PopUp label="הצג התקדמות התיק" icon="pi pi-ellipsis-v" visible={visible} setVisible={setVisible} content={<Progress idfile={idfile} ></Progress>} ></PopUp>

                            </div>
                        </div>
            </Card>
            <br></br>
            <Result details={{idfile:idfile}}></Result>
        </div>
    </>)
}
export default SpecificFiles;
