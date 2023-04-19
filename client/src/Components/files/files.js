import React, { useState, useEffect, useRef } from 'react';
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

const Files = () => {
    const { getData, postData, updateData, deteteData } = useFunc();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const { data, loading, error, refetch } = useAxiosGet("file/byManager", 2);
    const [search, setSearch] = useState('');
    const [visible1, setVisible1] = useState(false);
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        console.log("products", products);
        setProducts(data);
    }, [data]);

    useEffect(() => {
        console.log("products", products);
        if (!search || search == '')
            setProducts(data);
    }, [search]);

    if (loading)
        return <p>loading</p>

    const deleteProd = async (id) => {
        await deteteData("officer", id);
        refetch();
        // const { data: pr, loading: prl, error: pre, refetch: prr } = await getData("officer/byManager", 1);
        // console.log("products===========", pr);
        // setProducts(pr)
        // setProducts([{ name: "aaa", idNumber: 123, mail: "jjjj", numOfDocuments: 1, professionUnit: "asd" }]);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'הפקיד נמחק בהצלחה', life: 1500 });
    }

    const listItem = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <Tag value="תוצאת התיק" severity={getSeverity(product)}></Tag>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <span className="font-semibold">{product.idNumber}</span>
                                </span>
                            </div>
                            <h4 className="mt-0 mb-3">מגיש התיק:</h4>
                            <Tag value={product.name}></Tag>
                            <h4 className="mb-1">סטטוס: {product.statusName}</h4>
                            {/* <h4 className="mb-1">תאריך פתיחת התיק: {product.openDate}</h4> */}
                            <h4 className="mt-0 mb-3">פקיד מטפל: {product.officerName}</h4>
                            <h5 className="mt-0 mb-3">הערות: {product.remarks || "---"}</h5>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <Button icon="pi pi-sign-in" className="p-button p-button-rounded" tooltip='כניסה לתיק' />
                            <Button icon="pi pi-lock" className="p-button p-button-rounded" tooltip='סגירת התיק' />
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

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <Tag value="תוצאת התיק" severity={getSeverity(product)}></Tag>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <h4 className="mt-0 mb-3">מגיש התיק:</h4>
                        <Tag value={product.name}></Tag>
                        <h4 className="mb-1">סטטוס: {product.statusName}</h4>
                        {/* <h4 className="mb-1">תאריך פתיחת התיק: {product.openDate}</h4> */}
                        <h4 className="mt-0 mb-3">פקיד מטפל: {product.officerName}</h4>
                        <h5 className="mt-0 mb-3">הערות: {product.remarks || "---"}</h5>
                        <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                            <Button icon="pi pi-sign-in" className="p-button p-button-rounded" tooltip='כניסה לתיק' />
                            <Button icon="pi pi-lock" className="p-button p-button-rounded" tooltip='סגירת התיק' />
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
        let keys = ["name", "officerName", "remarks","statusName"]
        for (let i = 0; i < keys.length; i++) {
            if (typeof (p[keys[i]]) == "string" && p[keys[i]].indexOf(args) != -1)
                return true;
            if (typeof (p[keys[i]]) == "number" && p[keys[i]].toString().indexOf(args) != -1) return true;
        }
        return false;
    }

    const FilterProduct = async (args) => {
        // refetch();
        // pr = data.filter(p => forFilter(p, args))

        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("file/byManager", 2);
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
                <Button style={{ direction: "ltr" }} type="button" label="PDFיצוא התיקים ל" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>
            <br></br>
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

    //         return (<>
    //             {/* 
    // בשביל שיהיה בשמאל ולא במרכז צריך שבאבא
    // justify-content: flex-end !important;
    // } */}
    //             <Grid url="officer/byManager" param='1' style={{ marginLeft: "50px" }} title="הפקידים שלי" popup={<PopUp label="הוסף פקיד חדש" icon="pi pi-user-plus" header="הכנס פרטי פקיד" content={<AddOfficer></AddOfficer>} ></PopUp>} productService={ProductService}></Grid>
    //         </>)
    //     }
};

export default Files;




