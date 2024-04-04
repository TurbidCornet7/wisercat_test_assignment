import { useEffect, useState } from "react";
import FilterList from "./components/FilterList.jsx";
import { Button, Container, Form, Modal } from "react-bootstrap";
import AddFilterForm from "./components/AddFilterForm.jsx";

function App() {
  const [filters, setFilters] = useState([]);

  const [show, setShow] = useState(false);
  const [openInModal, setOpenInModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchFilters = async () => {
    try {
      const response = await fetch("http://localhost:8080/filters");
      const data = await response.json();
      setFilters(data);
    } catch (error) {
      console.log("Error fetching filters: ", error);
    }
  };
  useEffect(() => {
    fetchFilters();
  }, []);

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
      await fetchFilters();
      handleClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container className="text-center">
      <Button className="mt-5" onClick={handleShow}>
        Add Filter
      </Button>
      <Form className="text-start">
        <Form.Check
          type="switch"
          label="open in modal"
          checked={openInModal}
          onChange={() => setOpenInModal(!openInModal)}
        />
      </Form>
      {openInModal ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddFilterForm onAddFilter={handleAddFilter}></AddFilterForm>
          </Modal.Body>
        </Modal>
      ) : show ? (
        <Container style={{ width: "450px" }}>
          <AddFilterForm onAddFilter={handleAddFilter}></AddFilterForm>
        </Container>
      ) : null}
      <header className="mt-5">
        <h1>Filters</h1>
      </header>
      <FilterList filters={filters}></FilterList>
    </Container>
  );
}

export default App;
