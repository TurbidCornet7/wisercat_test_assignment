import React, {useEffect, useState} from "react";

export default function FilterList() {
    const [filters, setFilters] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    useEffect(() => {
        fetch('http://localhost:8080/filters').then(response => response.json()).then(data => setFilters(data));
    }, []);
    const handleClick = (item) => {
        setSelectedItem(item)
    }

    return (<div className={"container text-center"}>
        <header>
            <h1 className={"mb-4"}>Filters</h1>
        </header>
        <div>
            <table className={"table table-hover table-striped"}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {filters.map(filter => (<React.Fragment key={filter.id}>
                    <tr onClick={() => handleClick(filter)}>
                        <td>{filter.id}</td>
                        <td>{filter.name}</td>
                    </tr>
                    {selectedItem && selectedItem.id === filter.id && selectedItem.criteria && (<tr>
                        <td colSpan={"2"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th>type</th>
                                    <th>Condition Type</th>
                                    <th>Codition Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedItem.criteria.map(criteria => (<tr key={criteria.id}>
                                    <td>{criteria.type}</td>
                                    <td>{criteria.conditionType}</td>
                                    <td>{criteria.conditionValue}</td>
                                </tr>))}
                                </tbody>
                            </table>
                        </td>
                    </tr>)}
                </React.Fragment>))}
                </tbody>
            </table>
        </div>
    </div>);


}
