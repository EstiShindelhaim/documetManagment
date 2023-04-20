import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { GetAllDocumentsForFile } from '../../Hooks/viewResolt';
import happy from'./happy.jpg';
 function Result() {
    const {data, loading, error, refetch } = GetAllDocumentsForFile();
    if (loading) 
    {
        return <p>Loading...</p>;
}
    if (error){ return <p>Error!</p>;}
    const productTemplate = (data) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={happy} alt={data.result} style={{height:"250px",width:"250px"}} className="w-6 shadow-2" />
                    <p>{data.result}</p>
                </div>
                <div>
                </div>
            </div>
        );
    };

    return (
        <div className="card flex justify-content-center">
            <Carousel value={data} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="360px"
            itemTemplate={productTemplate} />
        </div>
    )
}
export default Result;
        