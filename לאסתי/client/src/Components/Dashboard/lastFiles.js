
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Get} from '../../Hooks/fetchWithHook';



function GetLasts()
{
    const {data: dataFiles, loading:loadingFiles, error:errorFiles, refetch:refetchFiles } = Get("dash/5/7");
    
    if (loadingFiles) 
    {
        return <p>Loading...</p>;
    }
    if (errorFiles){ return <p>Error!</p>;}


    const dateWithHoure= (options, x) =>
    {
{console.log(new Date().toISOString());}
        const d = new Date(options[x]);
        const now = new Date();
        const time= d.toLocaleTimeString();
        const hours = time.slice(0,time.length-3);
        if(d.getDate() == now.getDate())
            return `היום, ${hours}`
        else
            return `${d.toLocaleDateString()}`
    }

    return(
       
        <div  > 
            {console.log(dataFiles)}
            <DataTable  value={dataFiles} rows={5} responsiveLayout="scroll" dataKey="file.idfile" className="text-right" >
            <Column className="text-right" field="file.IDnumberOfApplicant" header="מספר בקשה" sortable style={{ minWidth: '12rem' }}></Column>
            <Column className="text-right" field="file.ApplicationSubmissionDate" body={(val)=>dateWithHoure(val, "file.ApplicationSubmissionDate")} header="תאריך פתיחת הבקשה" sortable style={{minWidth: '12rem' }}></Column>
            <Column className="text-right" field="date" body={(val)=>dateWithHoure(val, "date")} header="תאריך סיום בדיקה" sortable style={{ minWidth: '12rem' }}></Column>
            </DataTable> 
        </div>
    )
}

                {/* <DataTable rows={5} paginator responsiveLayout="scroll">
                    <Column header="Image" body={(data) => <img className="shadow-2" src={`/demo/images/product/${data.image}`} alt={data.image} width="50" />} />
                    <Column field="name" header="Name" sortable style={{ width: '35%' }} />
                    <Column field="price" header="Price" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.price)} />
                    <Column
                        header="View"
                        style={{ width: '15%' }}
                        body={() => (
                            <>
                                <Button icon="pi pi-search" type="button" text />
                            </>
                        )}
                    />
                </DataTable> */}
export default GetLasts;