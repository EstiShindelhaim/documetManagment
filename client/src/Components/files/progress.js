import React from 'react'; 
import { Timeline } from 'primereact/timeline';
import useAxiosGet from "../../Hooks/useGet"

export default function Progress(props) {
    const { data, loading, error, refetch } = useAxiosGet("stages/byFileId", props.idfile);
    if(loading) return <p>loading</p>

    const events = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
        
    return (
        <div className="card">
            <Timeline value={events} opposite={(item) => item.status} 
    content={(item) => <small className="text-color-secondary">{item.date}</small>} />
        </div>
    )
}
        