import React from 'react';
import LastFiles from './lastFiles';
import CountGraf from './countGraf';
import RGgraf from './RGgraf';
import Pie from './pie';


export default function Dashboard() {
    return (<>

        <div className="grid" style={{ fontFamily: 'Segoe UI' }}>
            <div style={{ margin: "0.7% 0.1%" }}>
                <LastFiles></LastFiles>
            </div>
            <div className="col-12 xl:col-6">
                <div className="card surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <RGgraf></RGgraf>
                </div>
            </div>
            <div className="col-12 xl:col-6">
                <div className="card surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <Pie></Pie>
                </div>
            </div>
            <div className="col-12 xl:col-6">
                <div className="card surface-0 shadow-2 p-3 border-1 border-50 border-round">
                    <CountGraf></CountGraf>
                </div>
            </div>

        </div>
    </>)
}