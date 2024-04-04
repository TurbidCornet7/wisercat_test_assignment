import { Container, Modal, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";

export default function FilterList({ filters }) {
  const [show, setShow] = useState(false);
  const [selectedFilter, setSelectedFilterId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = (id) => {
    setSelectedFilterId(id);
    handleShow();
  };
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filters.map((filter) => (
            <tr onClick={() => handleClick(filter)} key={filter.id}>
              <td>{filter.id}</td>
              <td>{filter.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFilter?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Condition Type</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {selectedFilter?.criteria.map((criterion) => (
                <tr key={criterion.id}>
                  <td>{criterion.type}</td>
                  <td>{criterion.conditionType}</td>
                  <td>{criterion.conditionValue}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

FilterList.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      criteria: PropTypes.array,
    }),
  ),
};
