import React, { useEffect, useState, useRef, useContext } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from "react-router-dom"
import PopUp from './popup';
import UpdateDetails from './updateDetails';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import EmailLink from './emailLink';
import useAxiosGet from '../Hooks/useGet';
import UserContext from "./User/UserContext"

export default function Menu() {
    const user = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const { data, loading: ld, error: ed, refetch: rd } = useAxiosGet("principal");
    let { data: numOfDocumentForEmp, loading: le, error: ee, refetch: re } = useAxiosGet("manager/numOfDocumentsForOfficer", user.idmanager);
    let { data: numOfDocumentForManager, loading: lm, error: em, refetch: rm } = useAxiosGet("manager/numOfDocumentsForManager", user.idmanager);
    console.log("numOfDocumentForEmp", numOfDocumentForEmp);
    console.log("numOfDocumentForManager", numOfDocumentForManager);
    const navigate = useNavigate();
    const toast = useRef(null);

    if (ld || le || lm) return <p>loading....</p>

    numOfDocumentForEmp = numOfDocumentForEmp.num;
    numOfDocumentForManager = numOfDocumentForManager.num;
    const items = [
        {
            label: 'פקידים', icon: 'pi pi-fw pi-users',
            command: () => { navigate("/officers") }
        },
        {
            label: 'תיקים', icon: 'pi pi-folder-open'
            , command: () => { navigate("/files") }
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
                <b>{user.numOfDocumentsForOfficer}</b>/{user.numOfDocumentsForOfficer - numOfDocumentForEmp}
            </React.Fragment>
        );
    };
    const valueTemplateMan = (value) => {
        return (
            <React.Fragment>
                <b>{user.numOfDocumentsForManager}</b>/{user.numOfDocumentsForManager - numOfDocumentForManager}
            </React.Fragment>
        );
    };

    return (
        <div style={{ display: "flex" }} className="card">
            <TabMenu model={items} />
            <div >
            <div className="grid" style={{ fontFamily: 'Segoe UI' }}>
                <div className="col-12 md:col-6 lg:col-3">
                    <Tag value="מנהל" rounded></Tag>
                    {user.numOfDocumentsForManager - numOfDocumentForManager}/<b>{user.numOfDocumentsForManager}</b>
                    <ProgressBar value={((user.numOfDocumentsForManager - numOfDocumentForManager) / user.numOfDocumentsForManager) * 100} displayValueTemplate={valueTemplateMan}></ProgressBar>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <Tag value="פקידים" rounded></Tag>
                    {user.numOfDocumentsForOfficer - numOfDocumentForEmp}/<b>{user.numOfDocumentsForOfficer}</b>
                    <ProgressBar value={((user.numOfDocumentsForOfficer - numOfDocumentForEmp) / user.numOfDocumentsForOfficer) * 100} displayValueTemplate={valueTemplateEmp}></ProgressBar>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <EmailLink email={data.mail} tooltip="צור קשר עם סוכן המערכת"></EmailLink>
                </div>
                <div className="col-12 md:col-6 lg:col-3">
                    <PopUp visible={visible} setVisible={setVisible} label="עדכון פרטים אישיים" icon="pi pi-user-edit" header="הכנס את הפרטים החדשים" content={<UpdateDetails toast={toast} setVisible={setVisible}>  </UpdateDetails>} ></PopUp>
                </div>
            </div>
            </div>
            <Toast ref={toast} />
        </div>
    )
}