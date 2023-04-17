import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { ProductService } from './service/ProductService';
import useAxiosGet from "../../Hooks/useGet"
import { useFunc } from "../../Hooks/useFunc";

export default function LastFiles() {
    const [products, setProducts] = useState([]);
    const { getData, postData, updateData, deteteData } = useFunc();
    const { data, loading, error, refetch } = useAxiosGet("officer/byManager", 1);
    useEffect(() => {
        getData().then((data) => setProducts(data.slice(0, 9)));
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
    };

    

    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" className="p-button p-button-rounded" />
                        <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                    </div>
                </div>
            </div>
        );
    };

    return (<>
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between" >
                <h1 className="m-0" >{"תיקים אחרונים"}</h1>
        </div>
        <div className="card" style={{ direction: "ltr" }}>
            <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
    </>
    )
}
