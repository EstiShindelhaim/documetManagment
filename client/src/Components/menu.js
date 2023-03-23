import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom"
import PopUp from './popup';
import UpdateDetails from './updateDetails';
import { Button } from 'primereact/button';

export default function Menu() {
    const navigate = useNavigate();
    const items = [
        {label: 'פקידים', icon: 'pi pi-fw pi-users'
        , command:()=>{navigate("/officers")}
    },
        {label: 'תיקים', icon: 'pi pi-folder-open'
        // ,command:()=>{navigate("/files")}
    },
    { label: 'יחידות מקצוע', icon: 'pi pi-th-large' },
        { label: 'דאשבורד', icon: 'pi pi-fw pi-chart-line' }
    ];

    return (
        <div className="card">
            <TabMenu model={items} />
            <Button icon="pi pi-comment" tooltip="צור קשר עם סוכן המערכת" lassName="p-button-rounded" ></Button>
            <PopUp label="עדכון פרטים אישיים" icon="pi pi-user-edit" header="הכנס את הפרטים החדשים" content={<UpdateDetails></UpdateDetails>} ></PopUp>
            <br></br>
        </div>
    )
}