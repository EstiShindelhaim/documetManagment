import React from 'react';
import { Carousel } from 'primereact/carousel';
import useAxiosGet from "../../Hooks/useGet"
import { Avatar } from "primereact/avatar";
import { Tag } from 'primereact/tag';

function Result(props) {

    const { data, loading, error, refetch } = useAxiosGet("document/byFile", props.details.idfile);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) { return <p>אין מסמכים</p>; }
    const ProductTemplate = (data) => {
        

        return (
            <>
                <div className="flex flex-row flex-column border-1 surface-border border-round m-2 text-center py-1 px-2 ">
                    <div >
                       
                        <iframe src={`http://localhost:5000/document/${props.details.idfile}/${data.name}/${data.docType}`}
                            style={{ height: "500px" }}></iframe>
                        <br></br>
                        
                        <Avatar
                            label={data.result + "%"}
                            className="mr-2"
                            padding="20px"
                            size="large"
                            style={{ margin: "20px", fontSize: "15px", backgroundColor: "#F4910A", color: "#ffffff" }}
                            shape="circle"
                        />
                        <span>:</span><span>תוצאת המסמך</span>
                        <br></br>

                        <span>שם המסמך</span>
                        <Tag value={data.name} severity={'success'}></Tag>


                    </div>
                </div>
            </>
        );
    };

    return (<>
        {data && <div dir={'ltr'} style={{ dir: 'ltr' }}>
            <Carousel value={data} numVisible={data.Length % 3} numScroll={1} orientation="horizontal" verticalViewPortHeight="360px"
                itemTemplate={ProductTemplate} />
        </div>}
    </>
    )
}
export default Result;
