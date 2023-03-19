import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom"
import PopUp from './popup';
import UpdateDetails from './updateDetails';

export default function Menu() {
    const navigate = useNavigate();
    const items = [
        {label: 'פקידים', icon: 'pi pi-fw pi-users'
        , command:()=>{navigate("/officers")}
    },
        {label: 'תיקים', icon: 'pi pi-folder-open'
        // ,command:()=>{navigate("/files")}
    },
        { label: 'דאשבורד', icon: 'pi pi-fw pi-chart-line'}
    ];

    return (
        <div className="card">
            <TabMenu model={items} />
            <PopUp label="עדכון פרטים אישיים" icon="pi pi-user-edit" header="הכנס את הפרטים החדשים" content={<UpdateDetails></UpdateDetails>} ></PopUp>
        </div>
    )
}