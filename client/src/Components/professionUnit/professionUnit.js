import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import Grid from "../grid";
import PopUp from "../popup";
// import AddOfficer from "./addOfficers"
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
import AddProfessionUnit from "./addprofessionUnit"
import UpdateProfessionUnitDetails from './updateProfessionUnitDetails';
import Delete from '../delete';
import { Toast } from 'primereact/toast';
import UserContext from "../User/UserContext"

const ProfessionUnit = () => {
    const user = useContext(UserContext);
    const { getData, postData, updateData, deteteData } = useFunc();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const { data, loading, error, refetch } = useAxiosGet("professionUnit/byManager",user.idmanager);
    const [search, setSearch] = useState('');
    const [visible1, setVisible1] = useState(false);
    const [visible, setVisible] = useState(0);
    const toast = useRef(null);

    useEffect(() => {
        console.log("products", products);
        if (!search || search == '')
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
        let res = await deteteData("professionUnit", id);
        refetch();
        if (res.status == 201 || res.status == 200) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'יחידת המקצוע נמחקה בהצלחה', life: 1500 });
        }
        else {
            // console.log("resssssssssssssssssssssssssssssssssss",res.response.data.message);
            alert(res.response.data.message)
           //toast.current.show({severity: 'error', summary: 'Error Message', detail: 'Validation failed'});

        }
    }
    const listItem = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            {/* <div className="font-semibold">{product.mail}</div> */}
                            <p>מחיר למילוי הבקשה:</p>
                            <Tag value={product.costOfFillingApplication}></Tag>
                            <p>מספר ימים לצפיה בבקשה:</p>
                            <Tag value={product.daysForViewingClosedFile}></Tag>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <span className="font-semibold">{product.idNumber}</span> */}
                                </span>
                            </div>
                        </div>
                        {/* {let id=product.idofficer} */}

                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <PopUp label="עדכן יחידת מקצוע" icon="pi pi-pencil" header="עדכן יחידת מקצוע" id={product.idprofession_unit}  visible={visible} setVisible={setVisible} content={<UpdateProfessionUnitDetails toast={toast} setVisible={setVisible} setProducts={setProducts} name={product.name} daysForViewingClosedFile={product.daysForViewingClosedFile} costOfFillingApplication={product.costOfFillingApplication} id={product.idprofession_unit} ></UpdateProfessionUnitDetails>} ></PopUp>
                            {/* <Button icon="pi pi-user-minus" tooltip="מחיקת פקיד" className="p-button-rounded" onClick={() => { deleteProd(product.idofficer) }} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                            <br></br>
                            <Delete tooltip="מחיקת יחידת המקצוע" key={product.idprofession_unit} message={'?האם אתה בטוח שברצונך למחוק יחידה זו'} function={() => { deleteProd(product.idprofession_unit) }} ></Delete>
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
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold text-900">{product.name}</div>
                        {/* <div className="font-semibold">{product.mail}</div> */}
                        <p>מחיר למילוי הבקשה:</p>
                        <Tag value={product.costOfFillingApplication}></Tag>
                        <p>מספר ימים לצפיה בבקשה:</p>
                        <Tag value={product.daysForViewingClosedFile}></Tag>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        
                        {/* <div className="flex align-items-center gap-3"> */}
                        {/* <span className="flex align-items-center gap-2"> */}
                        {/* <span className="font-semibold">{product.idNumber}</span> */}
                        {/* </span>
                            </div>
                        </div> */}
                        {/* {let id=product.idofficer} */}
                        {/* <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"> */}
                        <PopUp label="עדכן יחידת מקצוע" icon="pi pi-pencil" header="עדכן יחידת מקצוע" id={product.idprofession_unit}  visible={visible} setVisible={setVisible} content={<UpdateProfessionUnitDetails toast={toast} setVisible={setVisible} setProducts={setProducts} name={product.name} daysForViewingClosedFile={product.daysForViewingClosedFile} costOfFillingApplication={product.costOfFillingApplication} id={product.idprofession_unit} ></UpdateProfessionUnitDetails>} ></PopUp>
                        <Delete tooltip="מחיקת יחידת המקצוע" key={product.idprofession_unit} message={'?האם אתה בטוח שברצונך למחוק יחידה זו'} function={() => { deleteProd(product.idprofession_unit) }} ></Delete>
                    </div> {/* <Button icon="pi pi-user-minus" tooltip="מחיקת פקיד" className="p-button-rounded" onClick={() => { deleteProd(product.idofficer) }} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                    <br></br>
                    

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
        let keys = ["name", "costOfFillingApplication", 'daysForViewingClosedFile']
        for (let i = 0; i < keys.length; i++) {
            if (typeof (p[keys[i]]) == "string" && p[keys[i]].indexOf(args) != -1)
                return true;
            if (typeof (p[keys[i]]) == "number" && p[keys[i]].toString().indexOf(args) != -1) return true;
        }
        return false;
    }
    const FilterProduct = async (args) => {
        let { data: pr, loading: prl, error: pre, refetch: prr } = await getData("professionUnit/byManager", user.idmanager);

        pr = pr.filter(p => forFilter(p, args))
        console.log(pr);
        setProducts(pr);
    }

    const cols = [
        { field: 'name', header: 'שם' },
        { field: 'daysForViewingClosedFile', header: "מס' ימים לצפיה בבקשה" },
        { field: 'costOfFillingApplication', header: "מחיר למילוי בקשה" },
        // { field: 'companyId', header: 'Company id' }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, products);
                doc.save('professionUnits.pdf');
            });
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
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(products.map((e) => {
                return {
                    "שם": e.name,
                    "מס' ימים לצפיה בבקשה": e.daysForViewingClosedFile,
                    "מחיר למילוי בקשה": e.CostOfFillingApplication
                }
            }));
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'professionUnits');
        });
    };

    const header = () => {
        return (<>
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
                <h1 className="m-0" >{"יחידות מקצוע"}</h1>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText id="search" value={search} type="search" onInput={(e) => { FilterProduct(e.target.value); setSearch(e.target.value) }} placeholder="חפש..." />
                </span>
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
                <Button style={{ direction: "ltr" }} type="button" label="EXCELיצוא היחידות ל" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <span> </span>
                <Button style={{ direction: "ltr" }} type="button" label="PDFיצוא היחידות ל" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            </div>
            <br></br>
            <PopUp label="הוסף יחידת מקצוע חדשה" icon="pi pi-calendar-plus" header="הכנס פרטי יחידת מקצוע" visible={visible1} setVisible={setVisible1} content={<AddProfessionUnit toast={toast} setVisible={setVisible1} setProducts={setProducts} ></AddProfessionUnit>} ></PopUp>
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

export default ProfessionUnit;




