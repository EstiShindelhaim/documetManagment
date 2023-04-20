import Result from "./resolt";
import { GetAllDocumentsForFile } from "../../Hooks/viewResolt";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card'
import React, { useRef, useState } from 'react';
import { Dialog } from "primereact/dialog";
import { CloseFileByOfficer } from "../../Hooks/viewResolt";
const ViewResults = () => {

    const closeFile=()=>
    {
        console.log(("aaa"));
        setVisible(false)
        CloseFileByOfficer({"statusId":3})
    }
    const [visible, setVisible] = useState(false)
    const { data, loading, error, refetch } = GetAllDocumentsForFile();
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) { return <p>Error!</p>; }
    const footerContent = (
        <div>
            <Button label="לא" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="כן" icon="pi pi-check" onClick={() => closeFile()} autoFocus />
        </div>
    );
    return (

        <div class="card">
            <div class="card-container indigo-container overflow-hidden" >
                <div class="flex">
                    <div class="flex-1 md:flex-none flex align-items-center justify-content-center font-bold text-black m-2 px-5 py-3 border-round">
                        <div class="card">
                            <div class="card-container yellow-container overflow-hidden" >
                                <div className="card">
                                    <Card title="תוצאה">
                                        <p className="m-0">
                                            file.result<br></br>
                                            file.name<br></br>
                                            file.idfile<br></br>
                                        </p>
                                    </Card>
                                </div>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <div className="card flex flex-wrap justify-content-center gap-3">
                                    <Button label="סגור תיק" onClick={() => setVisible(true)} />
                                </div>
                                <Dialog visible={visible} onHide={() => setVisible(false)} footer={footerContent}>
                                    ?האם אתה בטוח                              
                                </Dialog>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 md:flex-none flex align-items-center justify-content-center  font-bold text-white m-2 px-5 py-3 border-round" >
                        <Result></Result>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewResults

