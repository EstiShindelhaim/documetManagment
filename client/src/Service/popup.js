
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function PopUp(props) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="card flex justify-content-center" style={{ direction: "ltr"}}>
            <Button label={props.label} icon={props.icon} onClick={() => setVisible(true)} />
            <Dialog header={props.header} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="m-0">
                    {props.content}
                </div>
            </Dialog>
        </div>
    )
}
        