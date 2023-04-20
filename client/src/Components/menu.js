import React, { useEffect, useState, useRef } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from "react-router-dom"
import PopUp from './popup';
import UpdateDetails from './updateDetails';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { useFunc } from "../Hooks/useFunc";
import { Toast } from 'primereact/toast';


export default function Menu() {
    const { getData, postData, updateData, deteteData } = useFunc();
    const [visible, setVisible] = useState(false);
    const [numOfDocumentForEmp, setNumOfDocumentForEmp] = useState(0);
    const [numOfDocumentForManager, setNumOfDocumentForManager] = useState(0);

    const RestFileEmp = async () => {
        const { data, loading, error, refetch } = await getData("manager/numOfDocumentsForOfficer", 1);
        console.log("data num", data.num);
        return (data.num)
    }
    const RestFileForManager = async () => {
        const { data, loading, error, refetch } = await getData("manager/numOfDocumentsForManager", 1);
        console.log("data num", data.num);
        return (data.num)
    }

    useEffect(() => {
        // RestFileEmp()
        // .then(data => {
        //     console.log("setNumOfDocumentForEmp", data);
        //     setNumOfDocumentForEmp(data);
        // });
        getData("manager/numOfDocumentsForOfficer", 1)
            .then(data => {
                console.log("setNumOfDocumentForEmp", data);
                setNumOfDocumentForEmp(data.data.num);
            });

        // RestFileForManager()
        //     .then(data => {
        //         console.log("setNumOfDocumentForMan", data);
        //         setNumOfDocumentForManager(data);
        //     });

        getData("manager/numOfDocumentsForManager", 1)
        .then(data => {
            console.log("setNumOfDocumentForMan", data);
            setNumOfDocumentForManager(data.data.num);
        });

    }, []);
    const navigate = useNavigate();
    const toast = useRef(null);
    const items = [
        {
            label: 'פקידים', icon: 'pi pi-fw pi-users',
            command: () => { navigate("/officers") }
        },
        {
            label: 'תיקים', icon: 'pi pi-folder-open'
            ,command:()=>{navigate("/files")}
        },
        { 
            label: 'יחידות מקצוע', icon: 'pi pi-th-large', 
            command: () => { navigate("/professionUnits") } 
        },
        { 
            label: 'דאשבורד', icon: 'pi pi-chart-line',
            command: () => { navigate("/dashboard") }
        }
    ];

    const valueTemplateEmp = (value) => {
        return (
            <React.Fragment>
                <b>2000</b>/{2000 - numOfDocumentForEmp}
            </React.Fragment>
        );
    };
    const valueTemplateMan = (value) => {
        return (
            <React.Fragment>
                <b>2000</b>/{2000 - numOfDocumentForManager}
            </React.Fragment>
        );
    };

    return (
        <div style={{display:"flex", flexWrap:"wrap"}} className="card">
            <TabMenu model={items} />
            <div style={{ width: "10%", marginRight:"10%" /*, display:"flex", flexWrap:"wrap"}}*/}}> 
                <Tag value="מנהל" rounded></Tag>
                {2000 - numOfDocumentForManager}/<b>2000</b>
                <ProgressBar value={((2000 - numOfDocumentForManager) / 2000) * 100} displayValueTemplate={valueTemplateMan}></ProgressBar>
            </div> 
            <div style={{ width: "2%"}}></div>
            <div style={{ width: "10%" /*, display:"flex", flexWrap:"wrap"}}*/}}>
                <Tag value="פקידים" rounded></Tag>
                {2000 - numOfDocumentForEmp}/<b>2000</b>
                <ProgressBar value={((2000 - numOfDocumentForEmp) / 2000) * 100} displayValueTemplate={valueTemplateEmp}></ProgressBar>
            </div>
            <div style={{ width: "2%"}}></div>
            <Button style={{ display:"flex"}} icon="pi pi-send" tooltip="צור קשר עם סוכן המערכת" lassName="p-button-rounded" ></Button>
            <div style={{ width: "2%"}}></div>
            <PopUp visible={visible} setVisible={setVisible} label="עדכון פרטים אישיים" icon="pi pi-user-edit" header="הכנס את הפרטים החדשים" content={<UpdateDetails toast={toast} setVisible={setVisible}>  </UpdateDetails>} ></PopUp>
            <Toast ref={toast} />
        </div>
    )
}