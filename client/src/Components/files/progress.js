import React from 'react'; 
import { Timeline } from 'primereact/timeline';
import useAxiosGet from "../../Hooks/useGet"

export default function Progress(props) {
    const { data, loading, error, refetch } = useAxiosGet("stages/byFileId", props.idfile);
    if(loading) return <p>loading</p>
console.log("dddddddddddddata",data);

const findDate=(element)=>{
    const find=data.filter(e=>e.statusName==element);
    console.log("findddddddddddddddddd",find);
    if(find.length==0) return "---";
    return find[0].date
}
const arr=['נבדק ע"י הפקיד','הועבר למנהל','נסגר ע"י הפקיד','נבדק ע"י המנהל','נסגר ע"י המנהל'];
let events=[]
arr.forEach(element => {
        events.push({status:element, date: findDate(element)})
});
    // const events = [
    //     { status: 'נבדק ע"י הפקיד', date: data.filter(e=>e.statusName=='נבדק ע"י הפקיד')[0].date},
    //     { status: 'הועבר למנהל', daטte: '15/10/2020 14:00'},
    //     { status: 'נסגר ע"י הפקיד', date: '15/10/2020 16:15'},
    //     { status: 'נבדק ע"י המנהל', date: '16/10/2020 10:02'},
    //     { status: 'נסגר ע"י המנהל', date: '16/10/2020 11:01'}
    // ];
    console.log("eventssssssssssssssssssssssssssssssssssssss",events);  
    return (
        <div className="card">
            <Timeline value={events} opposite={(item) => item.status} 
    content={(item) => <small className="text-color-secondary">{item.date}</small>} />
        </div>
    )
}
        