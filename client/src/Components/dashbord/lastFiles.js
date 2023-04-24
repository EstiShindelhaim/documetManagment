import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import useAxiosGet from "../../Hooks/useGet"
import { useFunc } from "../../Hooks/useFunc";
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import UserContext from "../User/UserContext"

export default function LastFiles() {
    const user = useContext(UserContext);
    const { getData, postData, updateData, deteteData } = useFunc();
    const { data, loading, error, refetch } = useAxiosGet("dashboard/lastFiles/9", user.idmanager);
    const { data: dStatuses, loading: lStatuses, error: eStatuses, refetch: rStatuses } = useAxiosGet("status");
    const [statusId, setStatusId] = useState(3);
    const toast = useRef(null);

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

    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <h4 className="mt-0 mb-3">:מגיש התיק</h4>
                    <Tag value={product.name}></Tag>
                </div>
                <div>
                    <h4 className="mb-1">סטטוס: {product.statusName}</h4>
                    <h4 className="mb-1">תאריך בדיקה: {product.date}</h4>
                    <h4 className="mt-0 mb-3">פקיד מטפל: {product.officerName}</h4>
                    <Tag value="תוצאת התיק" severity={getSeverity(product)}></Tag>
                    <br></br><br></br>
                    <h5 className="mt-0 mb-3">{product.remarks || "---"} :הערות</h5>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-sign-in" className="p-button p-button-rounded" tooltip='כניסה לתיק' />
                        <Button onClick={() => { closeProd(product.idfile) }} icon="pi pi-lock" className="p-button p-button-rounded" tooltip='סגירת התיק' />
                        <Button icon="pi pi-send" className="p-button p-button-rounded" tooltip='שלח לבדיקה' />
                    </div>
                </div>
            </div>
        );
    };

    return (<>
        <Card>
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
                <h1 className="m-0" >{'תיקים שנבדקו לאחרונה ע"י הפקידים'}</h1>
            </div>
            <div className="card" style={{ direction: "ltr" }}>
                <Carousel value={data} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
            </div>
            <Toast ref={toast} />
        </Card>
    </>
    )
}
