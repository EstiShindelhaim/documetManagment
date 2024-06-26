import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import useAxiosGet from "../../Hooks/useGet"
import { useFunc } from "../../Hooks/useFunc";
import { SelectButton } from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';
import { Link } from "react-router-dom";
import PopUp from "../popup";
import Progress from './progress';
import UserContext from "../User/UserContext"

const Files = () => {
    const user = useContext(UserContext);
    const { getData, postData, updateData, deteteData } = useFunc();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const { data, loading, error, refetch } = useAxiosGet("file/byManager", user.idmanager);
    const { data: dStatuses, loading: lStatuses, error: eStatuses, refetch: rStatuses } = useAxiosGet("status");
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(0);
    const [statusId, setStatusId] = useState(3);
    const options = ['כל התיקים', 'תיקים שהועברו למנהל'];
    const [value, setValue] = useState(options[0]);

    const toast = useRef(null);
    useEffect(() => {
        setProducts(data);
    }, [data]);

    useEffect(() => {
        if (dStatuses) {
            setStatusId(dStatuses.filter(e => e.name == 'נסגר ע"י המנהל')[0].idstatus);
        }
    }, [dStatuses]);

    useEffect(() => {
        if (!search || search == '')
            setProducts(data);
    }, [search]);

    if (loading || lStatuses)
        return <p>loading</p>


    const closeProd = async (id) => {
        const body = { "statusId": statusId }
        await updateData("file", id, body);
        refetch();
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'התיק נסגר בהצלחה', life: 1500 });
    }

    const checkFile = async (id) => {
        const body = {}
        await updateData("file/checkFile", id, body);
        setTimeout(function () {
            refetch();
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'התיק נבדק בהצלחה', life: 1500 });
          }, 1000);
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
        
    }

    const listItem = (product) => {
        if (value == 'כל התיקים' || product.statusName == "הועבר למנהל")
            return (
                <div className="col-12">
                    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <Tag value={`תוצאת תיק: ${forResult(product)}`} severity={getSeverity(product)}></Tag>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <span className="font-semibold">{product.idNumber}</span>
                                    </span>
                                </div>
                                <p className="mt-0 mb-3">מגיש התיק: {product.name}</p>
                                <p className="mb-1">סטטוס: {product.statusName}</p>
                                <p className="mt-0 mb-3">עובד מטפל: {product.officerName}</p>
                                <p className="mt-0 mb-3">תאריך הגשת התיק: {product.ApplicationSubmissionDate}</p>
                                <p className="mt-0 mb-3">הערות: {product.remarks || "---"}</p>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <Link to={`/file/${product.idfile}`} id="link"  >
                                    <Button icon="pi pi-sign-in" className="p-button p-button-rounded" tooltip='כניסה לתיק' />
                                </Link>
                                <Button onClick={() => { closeProd(product.idfile) }} icon="pi pi-lock" className="p-button p-button-rounded" tooltip='סגירת התיק' />
                                <Button onClick={() => { checkFile(product.idfile) }} icon="pi pi-send" className="p-button p-button-rounded" tooltip='שליחה לבדיקה' />
                                <PopUp label="התקדמות התיק" id={product.idfile} icon="pi pi-ellipsis-v" visible={visible} setVisible={setVisible} content={<Progress idfile={product.idfile} ></Progress>} ></PopUp>
                            </div>
                        </div>
                    </div>
                </div>
            );
    };

    const getSeverity = (product) => {
        switch (product.result) {
            case 1:
                return 'success';

            case 0:
                return 'danger';

            case 'undefined':
                return 'warning';

            default:
                return null;
        }
    };

    const forResult = (product) => {
        switch (product.result) {
            case 1:
                return 'תקין';

            case 0:
                return 'מזויף';

            case 'undefined':
                return 'אזהרה';

            default:
                return null;
        }
    };

    const gridItem = (product) => {
        if (value == 'כל התיקים' || product.statusName == "הועבר למנהל")
            return (
                <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                    <div className="p-4 border-1 surface-border surface-card border-round">
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <div className="flex align-items-center gap-2">
                                <Tag value={`תוצאת תיק: ${forResult(product)}`} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            <p className="mt-0 mb-3">מגיש התיק: {product.name}</p>
                            <p className="mb-1">סטטוס: {product.statusName}</p>
                            <p className="mt-0 mb-3">עובד מטפל: {product.officerName}</p>
                            <p className="mt-0 mb-3">תאריך הגשת התיק: {product.ApplicationSubmissionDate}</p>                           
                            <p className="mt-0 mb-3">הערות: {product.remarks || "---"}</p>
                            <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                                <Link to={`/file/${product.idfile}`} id="link" >
                                    <Button icon="pi pi-sign-in" className="p-button p-button-rounded" tooltip='כניסה לתיק' />
                                </Link>
                                <Button onClick={() => { closeProd(product.idfile) }} icon="pi pi-lock" className="p-button p-button-rounded" tooltip='סגירת התיק' />
                                <Button onClick={() => { checkFile(product.idfile) }} icon="pi pi-send" className="p-button p-button-rounded" tooltip='שליחה לבדיקה' />
                                <PopUp label="התקדמות התיק" icon="pi pi-ellipsis-v" id={product.idfile} visible={visible} setVisible={setVisible} content={<Progress idfile={product.idfile} ></Progress>} ></PopUp>
                            </div>
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
        let keys = ["name", "officerName", "remarks", "statusName", "ApplicationSubmissionDate"]
        for (let i = 0; i < keys.length; i++) {
            if (typeof (p[keys[i]]) == "string" && p[keys[i]].indexOf(args) != -1)
                return true;
            if (typeof (p[keys[i]]) == "number" && p[keys[i]].toString().indexOf(args) != -1) return true;
        }
        return false;
    }

    const FilterProduct = async (args) => {

        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("file/byManager", user.idmanager);
        pr = pr.filter(p => forFilter(p, args))
        setProducts(pr);
    }

    const cols = [
        { field: "name", header: 'מגיש התיק' },
        { field: "statusName", header: 'סטטוס' },
        { field: "result", header: 'תוצאת התיק' },
        { field: "officerName", header: 'עובד מטפל' },
        { field: "ApplicationSubmissionDate", header: 'תאריך הגשת התיק' },
        { field: "remarks", header: 'הערות' }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, products);
                doc.save('files.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(products.map((e) => {
                return {
                    'מגיש התיק': e.name,
                    'סטטוס': e.statusName,
                    'תוצאת התיק': e.result,
                    'עובד מטפל': e.officerName,
                    'הערות': e.remarks,
                    'תאריך הגשת התיק': e.ApplicationSubmissionDate
                }
            }));
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'files');
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
    const filterToExcel = (e) => {
        return {
            'מגיש התיק': e.name,
            'סטטוס': e.statusName,
            'תוצאת התיק': e.result,
            'עובד מטפל': e.officerName,
            'הערות': e.remarks,
            'תאריך הגשת התיק': e.ApplicationSubmissionDate
        }
    }

    const header = () => {
        return (<>
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
                <h1 className="m-0" >{"התיקים שלי"}</h1>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText id="search" value={search} type="search" onInput={(e) => { FilterProduct(e.target.value); setSearch(e.target.value) }} placeholder="חפש..." />
                </span>
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>

                <Button style={{ direction: "ltr" }} type="button" label="EXCELיצוא התיקים ל" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <span> </span>
            </div>
            <br></br>
            <div className="flex justify-content-end" style={{ direction: "ltr" }}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
            <div className="card flex justify-content-center" style={{ direction: "ltr" }}>
                <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
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

export default Files;




