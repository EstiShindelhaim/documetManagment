import React, { useEffect, useState, useRef, useContext  } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from "react-router-dom"
import PopUp from './popup';
import UpdateDetails from './updateDetails';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { useFunc } from "../Hooks/useFunc";
import { Toast } from 'primereact/toast';
import EmailLink from './emailLink';
import useAxiosGet from '../Hooks/useGet';
import UserContext from "./User/UserContext"

export default function Menu() {
    const us=localStorage.getItem("user")
    const user=JSON.parse(us)
    // const user = useContext(UserContext);
    const { getData, postData, updateData, deteteData } = useFunc();
    const [visible, setVisible] = useState(false);
    const [numOfDocumentForEmp, setNumOfDocumentForEmp] = useState(0);
    const [numOfDocumentForManager, setNumOfDocumentForManager] = useState(0);
    const { data, loading, error, refetch } = useAxiosGet("principal");

    // const RestFileEmp = async () => {
    //     const { data, loading, error, refetch } = await getData("manager/numOfDocumentsForOfficer",  user.idmanager);
    //     console.log("data num", data.num);
    //     return (data.num)
    // }
    // const RestFileForManager = async () => {
    //     const { data, loading, error, refetch } = await getData("manager/numOfDocumentsForManager",  user.idmanager);
    //     console.log("data num", data.num);
    //     return (data.num)
    // }

    useEffect(() => {
        // RestFileEmp()
        // .then(data => {
        //     console.log("setNumOfDocumentForEmp", data);
        //     setNumOfDocumentForEmp(data);
        // });
        getData("manager/numOfDocumentsForOfficer", user.idmanager)
            .then(data => {
                console.log("setNumOfDocumentForEmp", data);
                setNumOfDocumentForEmp(data.data.num);
            });

        // RestFileForManager()
        //     .then(data => {
        //         console.log("setNumOfDocumentForMan", data);
        //         setNumOfDocumentForManager(data);
        //     });

        getData("manager/numOfDocumentsForManager",  user.idmanager)
            .then(data => {
                console.log("setNumOfDocumentForMan", data);
                setNumOfDocumentForManager(data.data.num);
            });

    }, []);
    
    const navigate = useNavigate();
    const toast = useRef(null);
    if(loading) return <p>loading</p>
    const items = [
        {
            label: 'דאשבורד', icon: 'pi pi-chart-line',
            command: () => { navigate("/dashboard") }
        },
        {
            label: 'עובדים', icon: 'pi pi-fw pi-users',
            command: () => { navigate("/officers") }
        },
        {
            label: 'תיקים', icon: 'pi pi-folder-open'
            , command: () => { navigate("/files") }
        },
        {
            label: 'יחידות מקצוע', icon: 'pi pi-th-large',
            command: () => { navigate("/professionUnits") }
        }
     
    ];

    const valueTemplateEmp = (value) => {
        return (
            <React.Fragment>
                <b>{user.numOfDocumentsForOfficer}</b>/{user.numOfDocumentsForOfficer - numOfDocumentForEmp}
            </React.Fragment>
        );
    };
    const valueTemplateMan = (value) => {
        return (
            <React.Fragment>
                <b>{user.numOfDocumentsForManager}</b>/{user.numOfDocumentsForManager- numOfDocumentForManager}
            </React.Fragment>
        );
    };

    return (
        <div style={{ display: "flex" }} className="card">
            <TabMenu model={items} />
            <div className="grid" style={{ fontFamily: 'Segoe UI' }}>
                <div className="col-12 md:col-6 lg:col-3">
                    <Tag value="מנהל" rounded></Tag>
                    {user.numOfDocumentsForManager- numOfDocumentForManager}/<b>{user.numOfDocumentsForManager}</b>
                    <ProgressBar value={((user.numOfDocumentsForManager - numOfDocumentForManager) / user.numOfDocumentsForManager) * 100} displayValueTemplate={valueTemplateMan}></ProgressBar>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <Tag value="עובדים" rounded></Tag>
                    {user.numOfDocumentsForOfficer - numOfDocumentForEmp}/<b>{user.numOfDocumentsForOfficer}</b>
                    <ProgressBar value={((user.numOfDocumentsForOfficer - numOfDocumentForEmp) / user.numOfDocumentsForOfficer) * 100} displayValueTemplate={valueTemplateEmp}></ProgressBar>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <EmailLink email={data.mail} tooltip="יצירת קשר עם סוכן המערכת"></EmailLink>
                    {/* <Button style={{ display: "flex" }} icon="pi pi-send" tooltip="צור קשר עם סוכן המערכת" lassName="p-button-rounded" ></Button> */}
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <PopUp visible={visible} setVisible={setVisible} label="עדכון פרטים" icon="pi pi-user-edit" header="הכנס את הפרטים החדשים" content={<UpdateDetails toast={toast} setVisible={setVisible}>  </UpdateDetails>} ></PopUp>
                </div>
            </div>

            <Toast ref={toast} />
        </div>
    )
}