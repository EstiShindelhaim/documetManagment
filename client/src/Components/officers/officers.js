import React, { useState, useEffect,useRef } from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import Grid from "../grid";
import PopUp from "../popup";
import AddOfficer from "./addOfficers"
import { ProductService } from '../officersAxios';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
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

const Officers = () => {
    const { getData, postData, updateData, deteteData } = useFunc();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const { data, loading, error, refetch } = useAxiosGet("officer/byManager", 1);
    const [search, setSearch] = useState('');
    const [visible1, setVisible1] = useState(false);
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    useEffect(() => {
        console.log("products", products);
        if (!search || search == '')
            setProducts(data);
    });
    if (loading)
        return <p>loading</p>

    const deleteProd = async (id) => {
        await deteteData("officer", id);
        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("officer/byManager", 1);
        setProducts(pr);
        toast.current.show({severity:'success', summary: 'Success', detail:'הפקיד נמחק בהצלחה', life: 1500});
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
                                    <span className="font-semibold">{product.idNumber}</span>
                                </span>
                            </div>
                            <div className="font-semibold">{product.mail}</div>
                            <p>מספר קבצים מאושרים: </p>
                            <Tag value={product.numOfDocuments}></Tag>
                            <p>יחידת מקצוע: </p>
                            <Tag value={product.professionUnit}></Tag>
                        </div>
                        {/* {let id=product.idofficer} */}
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button icon="pi pi-comment" tooltip="צור קשר" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                            <PopUp label="עדכן פרטי פקיד" icon="pi pi-user-edit" header="עדכן פרטי פקיד" visible={visible} setVisible={setVisible} content={<UpdateOfficerDetails toast={toast} setVisible={setVisible} setProducts={setProducts} numOfDocuments={product.numOfDocuments} id={product.idofficer}></UpdateOfficerDetails>} ></PopUp>
                            {/* <Button icon="pi pi-user-minus" tooltip="מחיקת פקיד" className="p-button-rounded" onClick={() => { deleteProd(product.idofficer) }} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                            <Delete key={product.idofficer} function={()=>{deleteProd(product.idofficer)}} ></Delete>
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
                            <span className="font-semibold">{product.idNumber}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{product.name}</div>
                        <div className="font-semibold">{product.mail}</div>
                        <p>מספר קבצים מאושרים: </p>
                        <Tag value={product.numOfDocuments}></Tag>
                        <p>יחידת מקצוע: </p>
                        <Tag value={product.professionUnit}></Tag>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button icon="pi pi-comment" tooltip="צור קשר" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        <PopUp label="עדכן פרטי פקיד" icon="pi pi-user-edit" header="עדכן פרטי פקיד" visible={visible} setVisible={setVisible} content={<UpdateOfficerDetails toast={toast} setVisible={setVisible} setProducts={setProducts} numOfDocuments={product.numOfDocuments} id={product.idofficer}></UpdateOfficerDetails>} ></PopUp>
                        {/* <Button icon="pi pi-user-minus" tooltip="מחיקת פקיד" className="p-button-rounded" onClick={() => { deleteProd(product.idofficer) }} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                        <Delete key={product.idofficer} function={()=>{deleteProd(product.idofficer)}} ></Delete>
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
        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("officer/byManager", 1);

        pr = pr.filter(p => forFilter(p, args))
        setProducts(pr);
    }

    const cols = [
        { field: 'idNumber', header: 'Id Number' },
        { field: 'name', header: 'Name' },
        { field: 'mail', header: 'Mail' },
        { field: 'numOfDocuments', header: 'Num Of Documents' },
        { field: 'professionUnit', header: 'Profession Unit' }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, products);
                doc.save('products.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(products.map((e) => {
                return {
                    "Id Number": e.idNumber,
                    "Name": e.name,
                    "Mail": e.mail,
                    "num Of Documents": e.numOfDocuments,
                    "Profession Unit": e.professionUnit
                }
            }));
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'products');
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
                <h1 className="m-0" >{"הפקידים שלי"}</h1>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText id="search" value={search} type="search" onInput={(e) => { FilterProduct(e.target.value); setSearch(e.target.value) }} placeholder="חפש..." />
                </span>
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
                <Button style={{direction:"ltr"}} type="button" label="EXCELיצוא הפקידים ל" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <span> </span>
                <Button style={{direction:"ltr"}} type="button" label="PDFיצוא הפקידים ל" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>
            <br></br>
            <PopUp label="הוסף פקיד חדש" icon="pi pi-user-plus" header="הכנס פרטי פקיד" visible={visible1} setVisible={setVisible1} content={<AddOfficer toast={toast} setVisible={setVisible1} setProducts={setProducts} ></AddOfficer>} ></PopUp>
            <div className="flex justify-content-end" style={{ direction: "ltr" }}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </>
        );
    };

    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
            <Toast ref={toast}/>
        </div>
    )

    //         return (<>
    //             {/* 
    // בשביל שיהיה בשמאל ולא במרכז צריך שבאבא
    // justify-content: flex-end !important;
    // } */}
    //             <Grid url="officer/byManager" param='1' style={{ marginLeft: "50px" }} title="הפקידים שלי" popup={<PopUp label="הוסף פקיד חדש" icon="pi pi-user-plus" header="הכנס פרטי פקיד" content={<AddOfficer></AddOfficer>} ></PopUp>} productService={ProductService}></Grid>
    //         </>)
    //     }
};

export default Officers;




