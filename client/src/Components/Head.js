import React from 'react'; 
// import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
// import 'primereact/resources/primereact.css';                       // core css
// import 'primeicons/primeicons.css';                                 // icons
// import 'primeflex/primeflex.css';                                   // css utility
// import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import PopUp from './popup'

export default function Header(props) {
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(props.products.map((e) => {
                // console.log("eeeeeeeeeeeeeeeeeeeeeeeee",e);
               return(props.filterToExcel(e)) 
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

  
    return  (<>
    
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
             <h1 className="m-0" >{props.h}</h1>
                <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    </span>
        </div>
        <br></br>
            <div style={{ textAlign: "center" }}>
            <span> </span>
         <Button style={{ direction: "ltr" }} type="button" label="EXCELיצוא  ל" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
         </div>
         <br></br>
        <PopUp label={props.label} icon={props.icon} header={props.header} visible={props.visible} setVisible={props.setVisible} content={props.content}></PopUp>
         <div className="flex justify-content-end" style={{ direction: "ltr" }}>
                <DataViewLayoutOptions layout={props.layout} onChange={(e) => props.setLayout(e.value)} />
            </div>
       
        </>
        );
}
