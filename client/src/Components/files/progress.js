import React from 'react'; 
import { Timeline } from 'primereact/timeline';
import useAxiosGet from "../../Hooks/useGet"

export default function Progress(props) {
    const { data, loading, error, refetch } = useAxiosGet("stages/byFileId", props.idfile);
    if(loading) return <p>loading</p>

const findDate=(element)=>{
    const find=data.filter(e=>e.statusName==element);
    if(find.length==0) return "---";
    return find[0].date
}
const arr=['נבדק ע"י העובד','הועבר למנהל','נסגר ע"י העובד','נבדק ע"י המנהל','נסגר ע"י המנהל'];
let events=[]
arr.forEach(element => {
        events.push({status:element, date: findDate(element)})
});
    return (
        <div className="card">
            <Timeline value={events} opposite={(item) => item.status} 
    content={(item) => <small className="text-color-secondary">{item.date}</small>} />
        </div>
    )
}
        