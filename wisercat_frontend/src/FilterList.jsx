import {useEffect, useState} from "react";

export default function FilterList() {
    const [filters, setFilters] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/filters').then(response => response.json()).then(data => setFilters(data));
    }, []);

    return (<div>
            <h2>
                <ul>
                    {filters.map(filter => (<li key={filter.id}>{filter.name}</li>))}
                </ul>
            </h2>
        </div>);


}
