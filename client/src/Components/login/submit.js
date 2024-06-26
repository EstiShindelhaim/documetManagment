
import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { $CombinedState } from '@reduxjs/toolkit';

export default function Submit(props) {
    const toast = useRef(null);

    const accept = () => {
        props.function();
    };

    const reject = () => {
    };

    const confirm2 = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message:`האם אתה בטוח שאתה רוצה לשנות?`,
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    return (
        <>
       
            <Toast ref={toast} />
            <ConfirmPopup />
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button label="אישור" icon="pi pi-check" id={props.id} onClick={confirm2}></Button>
            </div>
        </>
    )
}
        