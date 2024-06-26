
import React from 'react'; 
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import { Button } from 'primereact/button';

export default function MyButton(props) {
    console.log((props.label));
    console.log((props.icon));
    return (
    
        <div className="card flex flex-wrap justify-content-center gap-3">
            <Button label={props.label} icon={props.icon} 
             onClick={()=>{props.func()}} 
            />
        </div>
    )
}
