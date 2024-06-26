import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import PopUp from "../popup";
import AddOfficer from "./addOfficers"
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import useAxiosGet from "../../Hooks/useGet"
import { useFunc } from "../../Hooks/useFunc";
import UpdateOfficerDetails from './updateOfficerDetails';
import Delete from '../delete';
import { Toast } from 'primereact/toast';
import UserContext from "../User/UserContext"
import EmailLink from '../emailLink';

const Officers = () => {
    const user = useContext(UserContext);
    const { getData, postData, updateData, deteteData } = useFunc();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const { data, loading, error, refetch } = useAxiosGet("officer/byManager", user.idmanager);
    const [search, setSearch] = useState('');
    const [visible1, setVisible1] = useState(false);
    const [visible, setVisible] = useState(0);
    const toast = useRef(null);

    useEffect(() => {
        if (!search || search == '')
            setProducts(data);
    }, [data]);

    useEffect(() => {
        if (!search || search == '')
            setProducts(data);
    }, [search]);

    if (loading)
        return <p>loading</p>

    const deleteProd = async (id) => {
        await deteteData("officer", id);
        refetch();
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'העובד נמחק בהצלחה', life: 1500 });
    }

    const listItem = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <span>מספר זהות:</span>
                                    <span className="font-semibold">{product.idNumber}</span>
                                </span>
                            </div>
                            <div className="font-semibold">{product.mail}</div>
                            <p>מספר קבצים מאושרים: {product.numOfDocuments}</p>  
                            <p>יחידת מקצוע: {product.professionUnit}</p>
                        </div>
                        {/* {let id=product.idofficer} */}
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <EmailLink email={product.mail} tooltip="יצירת קשר "></EmailLink>
                            <PopUp label="עדכון " id={product.idofficer} icon="pi pi-user-edit" header="עדכן פרטי עובד" visible={visible} setVisible={setVisible} content={<UpdateOfficerDetails toast={toast} setVisible={setVisible} setProducts={setProducts} name={product.name} mail={product.mail} numOfDocuments={product.numOfDocuments} professionUnit={product.professionUnit} id={product.idofficer}></UpdateOfficerDetails>} ></PopUp>
                            {/* <Button icon="pi pi-user-minus" tooltip="מחיקת עובד" className="p-button-rounded" onClick={() => { deleteProd(product.idofficer) }} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                            <Delete tooltip="מחיקה " key={product.idofficer} message={'?האם אתה בטוח שברצונך למחוק עובד זה'} function={() => { deleteProd(product.idofficer) }} ></Delete>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <span>מספר זהות:</span>
                            <span className="font-semibold">{product.idNumber}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{product.name}</div>
                        <div className="font-semibold">{product.mail}</div>
                        <p>מספר קבצים מאושרים: {product.numOfDocuments}</p>
                        <p>יחידת מקצוע: {product.professionUnit}</p>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <EmailLink email={product.mail} tooltip="יצירת קשר "></EmailLink>
                        <PopUp label="עדכון" id={product.idofficer} icon="pi pi-user-edit" header="עדכן פרטי עובד" visible={visible} setVisible={setVisible} content={<UpdateOfficerDetails toast={toast} setVisible={setVisible} setProducts={setProducts} name={product.name} mail={product.mail} numOfDocuments={product.numOfDocuments} professionUnit={product.professionUnit} id={product.idofficer}></UpdateOfficerDetails>} ></PopUp>
                        {/* <Button icon="pi pi-user-minus" tooltip="מחיקת עובד" className="p-button-rounded" onClick={() => { deleteProd(product.idofficer) }} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                        <Delete tooltip="מחיקה " key={product.idofficer} message={'?האם אתה בטוח שברצונך למחוק עובד זה'} function={() => { deleteProd(product.idofficer) }} ></Delete>

                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }
        if (layout === 'list') return listItem(product);
        else if (layout === 'grid') return gridItem(product);
    };

    const forFilter = (p, args) => {
        let keys = ["idNumber", "name", "mail", "numOfDocuments", "professionUnit"]
        for (let i = 0; i < keys.length; i++) {
            if (typeof (p[keys[i]]) == "string" && p[keys[i]].indexOf(args) != -1)
                return true;
            if (typeof (p[keys[i]]) == "number" && p[keys[i]].toString().indexOf(args) != -1) return true;
        }
        return false;
    }

    const FilterProduct = async (args) => {
        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("officer/byManager", user.idmanager);

        pr = pr.filter(p => forFilter(p, args))
        setProducts(pr);
    }

    const cols = [
        { field: 'idNumber', header: "תעודת זהות" },
        { field: 'name', header: "שם" },
        { field: 'mail', header: "מייל" },
        { field: 'numOfDocuments', header: "מס' מסמכים שיכול לשלוח לבדיקה" },
        { field: 'professionUnit', header: "יחידת מקצוע" }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const filterToExcel = (e) => {
        return {
            "תעודת זהות": e.idNumber,
            "שם": e.name,
            "מייל": e.mail,
            "מס' מסמכים שיכול לשלוח לבדיקה": e.numOfDocuments,
            "יחידת מקצוע": e.professionUnit
        }
    }
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(products.map((e) => {
                console.log("eeeeeeeeeeeeeeeeeeeeeeeee", e);
                return (filterToExcel(e))
            }));
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'officers');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };


    const header = () => {
        return (<>
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
                <h1 className="m-0" >{"העובדים שלי"}</h1>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText id="search" value={search} type="search" onInput={(e) => { FilterProduct(e.target.value); setSearch(e.target.value) }} placeholder="חפש..." />
                </span>
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
                <Button style={{ direction: "ltr" }} type="button" label="EXCELיצוא העובדים ל" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <span> </span>
            </div>
            <br></br>
            <PopUp label="הוסף עובד" icon="pi pi-user-plus" header="הכנס פרטי עובד" visible={visible1} setVisible={setVisible1} content={<AddOfficer toast={toast} setVisible={setVisible1} setProducts={setProducts} ></AddOfficer>} ></PopUp>
            <div className="flex justify-content-end" style={{ direction: "ltr" }}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </>
        );
    };

    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
            <Toast ref={toast} />
        </div>
    )

 
};

export default Officers;




