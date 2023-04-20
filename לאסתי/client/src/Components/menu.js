import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom"

export default function Menu() {
    const navigate = useNavigate();
    const items = [
        {label: 'פתיחת תיק', icon: 'pi pi-fw pi-folder-open'
        , command:()=>{navigate("/openfile")}
    },
        {label: 'תיקים', icon: 'pi pi-fw pi-folder'
        ,command:()=>{navigate("/AllFiles")}
    },
        { label: 'דאשבורד', icon: 'pi pi-fw pi-chart-line',
        command:()=>{navigate("/Dashboard")}
    },
        { label: '  הגדרות ', icon: 'pi pi-fw pi-cog'
        ,command:()=>{navigate("/Setting")}
    }
    ];

    return (
        <div className="card" style={{marginBottom: "25px"}}>
            <TabMenu model={items} />
        </div>
    )

}