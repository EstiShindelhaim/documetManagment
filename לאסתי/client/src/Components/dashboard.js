import Graf from './Dashboard/graf';
import GetLasts from './Dashboard/lastFiles';
import Fake from './Dashboard/fake';
import Active from './Dashboard/active';
import Check from './Dashboard/check';
import OurCalendar from './Dashboard/calander';
import Checked from './Dashboard/checked';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Get } from '../Hooks/fetchWithHook';


const Dashboard = () => {


    return (
        <div className="grid" style={{fontFamily:'Segoe UI'}}>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">תיקים תקולים</span>
                            <div className="text-900 font-medium text-xl"><Fake></Fake></div>
                         </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                             <i className="pi false-icon pi-times-circle text-blue-500 text-xl"></i>
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">24 new </span> 
                    <span className="text-500">since last visit</span> */}
                </div>
            </div>
            <div className="col-12 md:col-6 lg:col-3">
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">תיקים פעילים</span>
                            <div className="text-900 font-medium text-xl"><Active></Active></div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-folder-open text-orange-500 text-xl"></i>
                        </div>
                    </div>
                    {/* <span className="text-green-500 font-medium">%52+ </span>
                    <span className="text-500">since last week</span> */}
                </div>
            </div>
        <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">תיקים בבדיקה</span>
                        <div className="text-900 font-medium text-xl"><Check></Check></div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi pi-question-circle text-cyan-500 text-xl"></i>
                    </div>
                </div>
                {/* <span className="text-green-500 font-medium">520  </span>
                <span className="text-500">newly registered</span> */}
            </div>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <span className="block text-500 font-medium mb-3">תיקים שנבדקו</span>
                        <div className="text-900 font-medium text-xl"><Checked></Checked></div>
                    </div>
                    <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className="pi true-icon pi-check-circle text-purple-500 text-xl"></i>
                    </div>
                </div>
                {/* <span className="text-green-500 font-medium">85 </span>
                <span className="text-500">responded</span> */}
            </div>
        </div>


        <div className="col-12 xl:col-6">
            <div className="card surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <h3>תיקים שנבדקו לאחרונה</h3>
                {/* <DataTable value={products} rows={5} paginator responsiveLayout="scroll">
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
                <GetLasts></GetLasts>
            </div>
        </div>

        <div className="col-12 xl:col-6">
            <div className="card surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <h3>תיקים בשנים האחרונות</h3>
                {/* <Chart type="line" data={lineData} options={lineOptions} /> */}
                <Graf></Graf>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;

