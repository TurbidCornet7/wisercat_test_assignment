import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Col, Form, Row} from "react-bootstrap";

export default function AddFilterForm({onAddFilter}) {
    const [filterName, setFilterName] = useState("");
    const [criteria, setCriteria] = useState([{type: "AMOUNT", conditionType: "EQUALS_TO", conditionValue: ""},]);
    const [validated, setValidated] = useState(false)

    const handleAddCriteria = () => {
        setCriteria([...criteria, {
            type: "AMOUNT", conditionType: "EQUALS_TO", conditionValue: "",
        },]);
    };
    const handleInputChange = (index, key, value) => {
        const updatedCriteria = [...criteria];
        updatedCriteria[index][key] = value;
        setCriteria(updatedCriteria);
    };


    const handleSubmit = (e) => {
        const form = e.currentTarget
        e.preventDefault()
        if (form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            onAddFilter(filterName, criteria);
            setFilterName("");
            setCriteria([{type: "AMOUNT", conditionType: "EQUALS_TO", conditionValue: ""},]);
        }
        setValidated(true);
    }

    const handleDeleteCriteria = (index) => {
        setCriteria(criteria.filter((_, i) => i !== index));
    };

    return (<div className={"container mt-4"}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Name</Form.Label>
                <Col sm={4}><Form.Control
                    required={true}
                    type={"text"}
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                /></Col>
            </Form.Group>
            <div
                className={"criteria-container"}
                style={{height: "300px", overflowY: "auto"}}
            >
                {criteria.map((criterion, index) => (<Form.Group as={Row} key={index}>
                    <Col>
                        <Form.Select
                            value={criterion.type}
                            onChange={(e) => handleInputChange(index, "type", e.target.value)}
                        >
                            <option value="AMOUNT">Amount</option>
                            <option value="TITLE">Title</option>
                            <option value="DATE">Date</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select
                            value={criterion.conditionType}
                            onChange={(e) => handleInputChange(index, "conditionType", e.target.value)}
                        >
                            {criterion.type === "AMOUNT" && (<>
                                <option value="EQUALS_TO">=</option>
                                <option value="LESS_THAN">&lt;</option>
                                <option value="MORE_THAN">&gt;</option>
                            </>)}
                            {criterion.type === "TITLE" && (<>
                                <option value="CONTAINS">Contains</option>
                                <option value="STARTS_WITH">Starts With</option>
                                <option value="STARTS_WITH">Ends With</option>
                            </>)}
                            {criterion.type === "DATE" && (<>
                                <option value="FROM_DATE">From</option>
                                <option value="TO_DATE">To</option>
                            </>)}
                        </Form.Select>
                    </Col>
                    <Col>
                        {criterion.type === "DATE" ? (<DatePicker
                            required
                            selected={criterion.conditionValue}
                            onChange={(date) => handleInputChange(index, "conditionValue", date)}
                            className={"form-control"}
                        />) : (<input
                            required
                            type="text"
                            className={"form-control"}
                            value={criterion.value}
                            onChange={(e) => handleInputChange(index, "conditionValue", e.target.value)}
                        />)}
                    </Col>
                    <Col>
                        <button
                            className={"btn btn-danger"}
                            type="button"
                            onClick={() => handleDeleteCriteria(index)}
                        >
                            -
                        </button>
                    </Col>
                </Form.Group>))}
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <button
                        className={"btn btn-primary"}
                        type={"button"}
                        onClick={handleAddCriteria}
                    >
                        Add Criteria
                    </button>
                    <button
                        className={"btn btn-success"}
                        type={"submit"}
                    >
                        Add Filter
                    </button>
                </div>
            </div>
        </Form>
    </div>);
}
