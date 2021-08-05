import React, { useState } from "react";
import { Modal, FormControl, Button, InputGroup, Badge } from "react-bootstrap";

const AddTechForm = ({ technologies, setTechnologies }) => {
  const [addTech, setAddTech] = useState("");
  const [error, setError] = useState(false);
  return (
    <div>
      <p style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.5 }}>Your Tech Stack</p>
      <InputGroup className="mb-1">
        <FormControl placeholder="ex.Python, Javascript" value={addTech} onChange={(e) => setAddTech(e.target.value)} />
        <InputGroup.Append>
          <Button
            variant="outline-info"
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
            variant="outline-info"
            className="mr-2 mt-2"
            onClick={() => {
              setTechnologies((prevState) => {
                return prevState.filter((tech) => tech !== t);
              });
            }}
          >
            {t}{" "}
            <Badge
              variant="dark"
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                backgroundColor: "transparent",
              }}
            >
              X
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AddTechForm;
