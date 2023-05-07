
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export default function PopUp(props) {
    const [visible1, setVisible1] = useState(false);
    console.log("prrrrrrrrrrrrrrrrrrrrrp",(props.visible==props.id),props.visible,props.id)
 if(props.id===props.visible)
// setVisible1(true)

// setVisible1(false)
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
            <Button label={props.label} icon={props.icon} onClick={() => props.setVisible(props.id)} />
            <Dialog  header={props.header} visible={false} style={{ width: '50vw' }} onHide={() => props.setVisible(0)}>
                <div className="m-0">
                    {props.content}
                </div>
            </Dialog>
        </div>
    )
}
        