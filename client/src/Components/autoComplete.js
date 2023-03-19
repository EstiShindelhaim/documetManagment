
import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

export default function AutoCompleted(props) {
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const search = (event) => {
        let _items = [...["hvghv","hubuhbub","hubbbh","hubhbu"]];
        setItems(event.query ? _items.filter(i => i.startsWith(event.query)): _items );
    }
    return (
        <div className="card flex justify-content-center">
            <AutoComplete value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} dropdown />
        </div>
    )
}