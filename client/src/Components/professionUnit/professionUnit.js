import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import Grid from "../grid";
import PopUp from "../popup";
// import AddOfficer from "./addOfficers"
import { ProductService } from '../officersAxios';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';
import useAxiosGet from "../../Hooks/useGet"
import { useFunc } from"../../Hooks/useFunc";
import UpdateProfessionUnitDetails from '../updateProfessionUnitDetails';







const ProfessionUnit = () => {
    const { getData,postData,updateData,deteteData } = useFunc();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const { data, loading, error, refetch } = useAxiosGet("professionUnit/byManager", 1);
    const [search, setSearch] = useState('');
    useEffect(() => {
        if((!products ||products.length==0)&&((!search ||search=='')))
        setProducts(data); console.log(products);
    });
    if (loading)
        return <p>loading</p>
    

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }
    // const deleteProd=async(id)=>{
    //     console.log("id",id);
    //     await deteteData("professionUnit", id); 
    //     let { data:pr, loading:prl, error:pre, refetch:prr } =await getData("officer/byManager", 1); 
    //     setProducts(pr);
    // }
        const listItem = (product) => {
            return (
                <div className="col-12">
                    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.name}</div>
                                {/* <div className="font-semibold">{product.mail}</div> */}
                                <p>מחיר למילוי הבקשה:</p>
                            <Tag value={product.CostOfFillingApplication}></Tag>
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
                                {/* <Button icon="pi pi-comment" tooltip="צור קשר" lassName="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                                <PopUp label="עדכן יחידת מקצוע"icon="pi pi-pencil" header="עדכן יחידת מקצוע" /*content={<UpdateOfficerDetails numOfDocuments={product.numOfDocuments} id={product.idofficer}></UpdateOfficerDetails>}*/ ></PopUp>
                                {/* <Button icon="pi pi-user-minus" tooltip="מחיקת פקיד" lassName="p-button-rounded" onClick={()=>{deleteProd(product.idofficer)}} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
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
                                {/* <span className="font-semibold">{product.idNumber}</span> */}
                            </div>
                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            <div className="text-2xl font-bold">{product.name}</div>
                            {/* <div className="font-semibold">{product.mail}</div> */}
                            <p>מחיר למילוי הבקשה:</p>
                            <Tag value={product.CostOfFillingApplication}></Tag>
                            <p>מספר ימים לצפיה בבקשה:</p>

                            <Tag value={product.daysForViewingClosedFile}></Tag>

                        </div>
                        <div className="flex align-items-center justify-content-between">
                            {/* <Button icon="pi pi-comment" tooltip="צור קשר" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                            <PopUp label="עדכן יחידת מקצוע"icon="pi pi-pencil" header="עדכן יחידת מקצוע" content={<UpdateProfessionUnitDetails id={product.idprofession_unit}></UpdateProfessionUnitDetails>} ></PopUp>
                            {/* <Button icon="pi pi-user-minus" tooltip="מחיקת פקיד" lassName="p-button-rounded" onClick={()=>{deleteProd(product.idofficer)}} disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
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
            let keys=["name","CostOfFillingApplication"]
            for (let i=0;i< keys.length;i++) {
                if (typeof (p[keys[i]]) == "string" && p[keys[i]].indexOf(args) != -1)
                    return true;
                if (typeof (p[keys[i]]) == "number" && p[keys[i]].toString().indexOf(args) != -1) return true;
            }
            return false;
        }
        
        const FilterProduct = async (args) => {
            let { data:pr, loading:prl, error:pre, refetch:prr } =await getData("professionUnit/byManager", 1); 

            pr = pr.filter(p => forFilter(p, args))
            console.log(pr);
            setProducts(pr);
        }
        const header = () => {
            return (<>
                <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
                    <h1 className="m-0" >{"יחידות מקצוע"}</h1>
                    <span className="p-input-icon-right">
                        <i className="pi pi-search" />
                        <InputText id="search" value={search} type="search" onInput={(e) => {FilterProduct(e.target.value);setSearch(e.target.value)} } placeholder="חפש..." />
                    </span>
                </div>
                <br></br>
                {/* {<PopUp label="הוסף יחידת מקצוע" icon="pi pi-user-plus" header="הכנס פרטי פקיד" content={<AddOfficer></AddOfficer>} ></PopUp>} */}
                {/* {console.log(props.popup)} */}
                <div className="flex justify-content-end" style={{ direction: "ltr" }}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </>
            );
        };

        return (
            <div className="card">
                <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
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
    export default ProfessionUnit;
 