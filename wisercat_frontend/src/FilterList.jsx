import React, {useState} from "react";
export default function FilterList(props) {
    const filters = props.filters
    const [selectedItem, setSelectedItem] = useState(null)

    const handleClick = (item) => {
        setSelectedItem(item)
    }

    return (<div className={"container text-center"}>

        <div>
            <table className={"table table-hover table-striped table-bordered"}>
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
                            <table className={"table table-striped "}>
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

