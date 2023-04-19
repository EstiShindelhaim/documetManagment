import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import useAxiosGet from "../../Hooks/useGet"
import { useFunc } from "../../Hooks/useFunc";

export default function LastFiles() {
    const [products, setProducts] = useState([]);
    const { getData, postData, updateData, deteteData } = useFunc();
    const { data, loading, error, refetch } = useAxiosGet("dashboard/lastFiles/9", 2);
    useEffect(() => {
        getData("dashboard/lastFiles/9", 2).then((data) => {setProducts(data);console.log(data);});
    }, []);
    useEffect(() => {
            setProducts(data);
    });
    if (loading)
        return <p>loading</p>
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

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

    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                <h4 className="mt-0 mb-3">:מגיש התיק</h4>
                    <Tag value={product.name}></Tag>
                </div>
                <div>
                    <h4 className="mb-1">תאריך בדיקה: {product.date}</h4>
                    <h4 className="mt-0 mb-3">פקיד מטפל: {product.officerName}</h4>
                    <Tag value="תוצאת התיק" severity={getSeverity(product)}></Tag>
                    <br></br><br></br>
                    <h5 className="mt-0 mb-3">{product.remarks||"---"} :הערות</h5>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-sign-in" className="p-button p-button-rounded" tooltip='כניסה לתיק'/>
                    </div>
                </div>
            </div>
        );
    };

    return (<>
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
                <h1 className="m-0" >{"תיקים אחרונים שנבדקו" }</h1>
        </div>
        <div className="card" style={{ direction: "ltr" }}>
            <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
    </>
    )
}
