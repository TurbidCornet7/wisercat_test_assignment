import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddFilterForm({ onAddFilter }) {
  const [filterName, setFilterName] = useState("");
  const [criteria, setCriteria] = useState([
    { type: "AMOUNT", conditionType: "EQUALS_TO", conditionValue: "" },
  ]);

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
  const handleInputChange = (index, key, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index][key] = value;
    setCriteria(updatedCriteria);
  };
  const handleAddFilter = () => {
    onAddFilter(filterName, criteria);
    setFilterName("");
    setCriteria([
      { type: "AMOUNT", conditionType: "EQUALS_TO", conditionValue: "" },
    ]);
  };

  const handleDeleteCriteria = (index) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  return (
    <div className={"container mt-4"}>
      <form>
        <div className={"form-group"}>
          <label>Name:</label>
          <input
            className={"form-control"}
            type={"text"}
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            required
          />
        </div>
        <div
          className={"criteria-container"}
          style={{ height: "300px", overflowY: "auto" }}
        >
          {criteria.map((criterion, index) => (
            <div key={index} className={"row mb-2"}>
              <div className={"col"}>
                <select
                  className={"form-control"}
                  value={criterion.type}
                  onChange={(e) =>
                    handleInputChange(index, "type", e.target.value)
                  }
                >
                  <option value="AMOUNT">Amount</option>
                  <option value="TITLE">Title</option>
                  <option value="DATE">Date</option>
                </select>
              </div>
              <div className={"col-3"}>
                <select
                  className={"form-control"}
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
                </select>
              </div>
              <div className={"col-3"}>
                {criterion.type === "DATE" ? (
                  <DatePicker
                    selected={criterion.conditionValue}
                    onChange={(date) =>
                      handleInputChange(index, "conditionValue", date)
                    }
                    className={"form-control"}
                  />
                ) : (
                  <input
                    type="text"
                    className={"form-control"}
                    value={criterion.value}
                    onChange={(e) =>
                      handleInputChange(index, "conditionValue", e.target.value)
                    }
                  />
                )}
              </div>
              <div className={"col-3"}>
                <button
                  className={"btn btn-danger"}
                  type="button"
                  onClick={() => handleDeleteCriteria(index)}
                >
                  -
                </button>
              </div>
            </div>
          ))}
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
              type={"button"}
              onClick={handleAddFilter}
            >
              Add Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
