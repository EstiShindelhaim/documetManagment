
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function PopUp(prop) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="card flex justify-content-center">
            <Button label="הוסף פקיד חדש" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="הכנס פרטי פקיד" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="m-0">
                    {prop.content}
                </div>
            </Dialog>
        </div>
    )
}
        