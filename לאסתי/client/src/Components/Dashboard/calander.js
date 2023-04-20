import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';


export default function OurCalendar() {

    const [date, setDate] = useState(null);


    return (
        <div className="card flex justify-content-center"style={{width:"60%",height:"20%"}}>
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
        </div>

    )
}