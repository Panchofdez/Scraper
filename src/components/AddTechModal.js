import React, { useState } from "react";
import { Modal, FormControl, Button, InputGroup, Badge } from "react-bootstrap";

const AddTechModal = ({
  technologies,
  setTechnologies,
  modalShow,
  setModalShow,
  addTechnologies,
}) => {
  const [addTech, setAddTech] = useState("");
  const [error, setError] = useState(false);
  return (
    <Modal show={modalShow} onHide={() => setModalShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Technologies/Skills</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-1">
          <FormControl
            placeholder="ex.Python, Javascript"
            value={addTech}
            onChange={(e) => setAddTech(e.target.value)}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => {
                if (addTech === "") {
                  return;
                }
                setTechnologies((prevState) => {
                  return [...prevState, addTech];
                });
                setAddTech("");
              }}
            >
              Add
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {error && (
          <div className="ml-2" style={{ color: "#d9534f", fontSize: "14px" }}>
            Must add at least 1 technology/skill
          </div>
        )}
        <div>
          {technologies.map((t, idx) => (
            <Button
              key={idx}
              variant="outline-secondary"
              className="mr-2 mt-2"
              onClick={() => {
                setTechnologies((prevState) => {
                  return prevState.filter((tech) => tech !== t);
                });
              }}
            >
              {t}{" "}
              <Badge
                variant="light"
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  backgroundColor: "white",
                }}
              >
                X
              </Badge>
            </Button>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            if (technologies.length === 0) {
              setError(true);
              return;
            }
            addTechnologies();
            setAddTech("");
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTechModal;
