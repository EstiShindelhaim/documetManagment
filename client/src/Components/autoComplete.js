
import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import useAxiosGet from '../Hooks/useGet'

export default function AutoCompleted(props) {
    const [items, setItems] = useState([]);
    const {data, loading, error, refetch} = useAxiosGet(props.url,props.params);
    if(loading)
    return (<p>louding</p>)
    let da=data.map(e=>e.name)
    const search = (event) => {
        let _items = [...da];
        setItems(event.query ? _items.filter(i => i.startsWith(event.query)): _items );
    }
    return (
        <div className="card flex justify-content-center">
            <AutoComplete id={props.id} value={props.value} suggestions={items} completeMethod={search}
             onChange={(e) => props.setValue(e.value)} dropdown />
        </div>
    )
}