
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function PopUp(props) {
 if(props.id===props.visible)
    return (
        <div className="card flex justify-content-center" style={{ direction: "ltr"}}>
            <Button label={props.label} icon={props.icon} onClick={() => props.setVisible(props.id)} />
            <Dialog  header={props.header} visible={true} style={{ width: '50vw' }} onHide={() => props.setVisible(0)}>
                <div className="m-0">
                    {props.content}
                </div>
            </Dialog>
        </div>
    )
    else
    return (
        <div className="card flex justify-content-center" style={{ direction: "ltr"}}>
            <Button label={props.label} icon={props.icon} rounded onClick={() => props.setVisible(props.id)} />
            <Dialog  header={props.header} visible={false} style={{ width: '50vw' }} onHide={() => props.setVisible(0)}>
                <div className="m-0">
                    {props.content}
                </div>
            </Dialog>
        </div>
    )
}
        