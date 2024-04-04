import { useState } from "react";
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

export default function AddFilterForm({ onAddFilter }) {
  const [validated, setValidated] = useState(false);
  const [criteria, setCriteria] = useState([
    { type: "AMOUNT", conditionType: "EQUALS_TO", conditionValue: "" },
  ]);
  const [filterName, setFilterName] = useState("");
  let buttonDisabled = criteria.length === 0;
  const handleInputChange = (index, key, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index][key] = value;
    setCriteria(updatedCriteria);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      onAddFilter(filterName, criteria);
      setFilterName("");
      setCriteria([
        {
          type: "AMOUNT",
          conditionType: "EQUALS_TO",
          conditionValue: "",
        },
      ]);
    }
    setValidated(true);
  };

  const handleDeleteCriteria = (index) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const handleAddCriteria = () => {
    setCriteria([
      ...criteria,
      {
        type: "AMOUNT",
        conditionType: "EQUALS_TO",
        conditionValue: "",
      },
    ]);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formName">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            required
            type="text"
            placeholder="name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formCriteria">
        <Form.Label column sm={2}>
          Criteria
        </Form.Label>
        <Col sm={12} style={{ overflowY: "auto", height: "200px" }}>
          {criteria.map((criterion, index) => (
            <Row className="mb-2" key={index}>
              <Col>
                <Form.Select
                  required
                  value={criterion.type}
                  onChange={(e) =>
                    handleInputChange(index, "type", e.target.value)
                  }
                >
                  <option value="AMOUNT">Amount</option>
                  <option value="TITLE">Title</option>
                  <option value="DATE">Date</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  required
                  value={criterion.conditionType}
                  onChange={(e) =>
                    handleInputChange(index, "conditionType", e.target.value)
                  }
                >
                  {criterion.type === "AMOUNT" && (
                    <>
                      <option value="EQUALS_TO">=</option>
                      <option value="LESS_THAN">&lt;</option>
                      <option value="MORE_THAN">&gt;</option>
                    </>
                  )}
                  {criterion.type === "TITLE" && (
                    <>
                      <option value="CONTAINS">Contains</option>
                      <option value="STARTS_WITH">Starts With</option>
                      <option value="STARTS_WITH">Ends With</option>
                    </>
                  )}
                  {criterion.type === "DATE" && (
                    <>
                      <option value="FROM_DATE">From</option>
                      <option value="TO_DATE">To</option>
                    </>
                  )}
                </Form.Select>
              </Col>
              <Col>
                {criterion.type === "DATE" && (
                  <DatePicker
                    required
                    selected={criterion.conditionValue}
                    onChange={(date) =>
                      handleInputChange(index, "conditionValue", date)
                    }
                    className={"form-control"}
                  />
                )}
                {criterion.type === "TITLE" && (
                  <Form.Control
                    required
                    type="text"
                    value={criterion.value}
                    onChange={(e) =>
                      handleInputChange(index, "conditionValue", e.target.value)
                    }
                  />
                )}
                {criterion.type === "AMOUNT" && (
                  <Form.Control
                    required
                    type="number"
                    value={criterion.value}
                    onChange={(e) =>
                      handleInputChange(index, "conditionValue", e.target.value)
                    }
                  />
                )}
              </Col>
              <Col sm={2}>
                <Button
                  className={"btn btn-danger"}
                  type="button"
                  onClick={() => handleDeleteCriteria(index)}
                >
                  -
                </Button>
              </Col>
            </Row>
          ))}
        </Col>
      </Form.Group>
      <Row className="text-center">
        <Col>
          <Button variant="primary" onClick={handleAddCriteria}>
            Add Criteria
          </Button>
          <OverlayTrigger
            placement="top"
            show={buttonDisabled}
            overlay={<Tooltip>At least on criterion is required</Tooltip>}
          >
            <Button variant="success" type="submit" disabled={buttonDisabled}>
              Add Filter
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </Form>
  );
}
AddFilterForm.propTypes = {
  onAddFilter: PropTypes.func,
};
