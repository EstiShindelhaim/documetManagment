import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import useAxiosGet from "../../Hooks/useGet"
import { useFunc } from "../../Hooks/useFunc";
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import UserContext from "../User/UserContext"
import PopUp from '../popup';
import Progress from '../files/progress';
import { Link } from "react-router-dom";

export default function LastFiles() {
    const us=localStorage.getItem("user")
    const user=JSON.parse(us)
    // const user = useContext(UserContext);
    const { getData, postData, updateData, deteteData } = useFunc();
    const { data, loading, error, refetch } = useAxiosGet("dashboard/lastFiles/9", user.idmanager);
    const { data: dStatuses, loading: lStatuses, error: eStatuses, refetch: rStatuses } = useAxiosGet("status");
    const [statusId, setStatusId] = useState(3);
    const toast = useRef(null);
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        if (dStatuses) {
            console.log("dStatuses", dStatuses);
            setStatusId(dStatuses.filter(e => e.name == 'נסגר ע"י המנהל')[0].idstatus);
            // setStatusPass(dStatuses.filter(e => e.name == 'הועבר למנהל')[0].idstatus);
            console.log("statusId", statusId);
        }

    }, [dStatuses]);

    if (loading || lStatuses)
        return <p>loading</p>


    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

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
        console.log("idddddddddddddddddddddd", id);
        await updateData("file", id, body);
        refetch();
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'התיק נסגר בהצלחה', life: 1500 });
    }
    const forResult = (product) => {
        switch (product.result) {
            case 1:
                return 'תקין';

            case 0:
                return 'מזויף';

            case 'undefined':
                return 'אזהרה';

            default:
                return null;
        }
    };




    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3" style={{ width:"70%", padding: "10px" }}>
                <div className="mb-3">
                    <h4 className="mt-0 mb-3">:מגיש התיק</h4>
                    <Tag value={product.name}></Tag>
                </div>
                <div>
                    <h4 className="mb-1">סטטוס: {product.statusName}</h4>
                    <h4 className="mb-1">תאריך בדיקה: {product.date}</h4>
                    <h4 className="mt-0 mb-3">עובד מטפל: {product.officerName}</h4>
                    <Tag value={`תוצאת תיק: ${forResult(product)}`} severity={getSeverity(product)}></Tag>
                    <h5 className="mt-0 mb-3">{product.remarks || "---"} :הערות</h5>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                    <Link to={`/file/${product.idfile}`} id="link"  >
                                    <Button icon="pi pi-sign-in" className="p-button p-button-rounded" tooltip='כניסה לתיק' />
                                </Link>
                        <Button onClick={() => { closeProd(product.idfile) }} icon="pi pi-lock" className="p-button p-button-rounded" tooltip='סגירת התיק' />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-send" className="p-button p-button-rounded" tooltip='שלח לבדיקה' />
                        <PopUp label="הצג התקדמות התיק" icon="pi pi-ellipsis-v" id={product.idfile} visible={visible} setVisible={setVisible} content={<Progress idfile={product.idfile} ></Progress>} ></PopUp>

                    </div>
                </div>
            </div>
        );
    };

    return (<>
        <Card>
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
                <h1 className="m-0" >{'תיקים אחרונים'}</h1>
            </div>
            <div className="card" style={{ direction: "ltr" }}>
                <Carousel value={data} numVisible={4} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
            </div>
            <Toast ref={toast} />
        </Card>
    </>
    )
}
