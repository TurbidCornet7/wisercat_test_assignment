import React, { useEffect, useState } from "react";
import FilterList from "./FilterList.jsx";
import AddFilterForm from "./AddFilterForm.jsx";

export default function Filters() {
  const [filters, setFilters] = useState([]);
  const [isAddFilterOpen, setIsAddFilterOpen] = useState(false);

  const fetchFilters = async () => {
    try {
      const response = await fetch("http://localhost:8080/filters");
      if (!response.ok) {
        throw new Error("Failed to fetch filters");
      }
      const data = await response.json();
      setFilters(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchFilters();
  });

  const handleAddFilter = async (filterName, criteria) => {
    try {
      const filter = {
        name: filterName,
        criteria: criteria,
      };

      const response = await fetch("http://localhost:8080/filters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
      });
      if (!response.ok) {
        throw new Error("Failed to add filter");
      }
      fetchFilters();
      toggleModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setIsAddFilterOpen(!isAddFilterOpen);
  };

  return (
    <div className={"container-fluid text-center"}>
      <header>
        <h1 className={"mb-4"}>Filters</h1>
      </header>
      <button className={"btn btn-primary"} onClick={toggleModal}>
        Add Filter
      </button>
      {isAddFilterOpen && <AddFilterForm onAddFilter={handleAddFilter} />}
      <FilterList filters={filters} />
    </div>
  );
}
