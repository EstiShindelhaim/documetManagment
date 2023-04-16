import React, { useState} from 'react';
import { TabMenu } from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom"
import PopUp from './popup';
import UpdateDetails from './updateDetails';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';

export default function Menu() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const items = [
        {label: 'פקידים', icon: 'pi pi-fw pi-users'
        , command:()=>{navigate("/officers")}
    },
        {label: 'תיקים', icon: 'pi pi-folder-open'
        // ,command:()=>{navigate("/files")}
    },
    { label: 'יחידות מקצוע', icon: 'pi pi-th-large', command:()=>{navigate("/professionUnits")} },
        { label: 'דאשבורד', icon: 'pi pi-fw pi-chart-line' }
    ];

    const valueTemplate = (value) => {
        return (
            <React.Fragment>
                {value}/<b>100</b>
            </React.Fragment>
        );
    };

    return (
        <div className="card">
            <TabMenu model={items} />
            <div style={{width:"10%"}}>
            <Tag value="מנהל" rounded></Tag>
            <ProgressBar   value={55} displayValueTemplate={valueTemplate}></ProgressBar>
            <Tag value="פקידים" rounded></Tag>
            <ProgressBar value={40} displayValueTemplate={valueTemplate}></ProgressBar>
            </div>
            <Button icon="pi pi-comment" tooltip="צור קשר עם סוכן המערכת" lassName="p-button-rounded" ></Button>
            <PopUp visible={visible} setVisible={setVisible} label="עדכון פרטים אישיים" icon="pi pi-user-edit" header="הכנס את הפרטים החדשים" content={<UpdateDetails setVisible={setVisible}>  </UpdateDetails>} ></PopUp>
            <br></br>
        </div>
    )
}