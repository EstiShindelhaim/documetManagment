import File from './file';
import getAllFiles from '../Service/allFile';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const openNew=()=>
{
    alert("open file")
}

const leftToolbarTemplate = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />{/*לשלוח לפונקציה המתאימה */}
            <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}  />
        </div>
    );
};



const confirmDeleteSelected = () => {

};



function AllFiles(props) {

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">תיקים</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." /> 
            </span>
        </div>
    );
    const [globalFilter, setGlobalFilter] = useState(null);
    const [files, setFiles] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    getAllFiles({statusId: 2})
    .then(x=>setFiles(x))
    // console.log(x);
  },[]);

  return (
    <div>
    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
        <DataTable  value={files} /*selection={selectedProducts}onSelectionChange={(e) => setSelectedProducts(e.value)}*/ 
            dataKey="idFile"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
        <Column selectionMode="multiple" exportable={false}></Column>
        <Column field="IDnumberOfApplicant" header="IDnumberOfApplicant" sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="ApplicationSubmissionDate" header="ApplicationSubmissionDate" sortable style={{ minWidth: '12rem' }}></Column>
        <Column field="status.name" header="status" sortable style={{ minWidth: '12rem' }}></Column>
        {/* <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column> */}
    </DataTable>
    </div>

  );
}
// {files.map((f,ind)=><File file={f} key={ind}></File>)}
export default AllFiles;