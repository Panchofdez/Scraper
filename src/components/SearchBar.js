import React, { useState } from "react";
import {
  ButtonToolbar,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";

const SearchBar = ({ setSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <ButtonToolbar className="mb-3">
      <InputGroup>
        <FormControl
          type="text"
          style={{ width: "500px" }}
          className="elevated"
          placeholder="Search by job title, company name or preferred technologies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() => {
              if (searchTerm === "") {
                return;
              }
              setSearch(searchTerm);
            }}
          >
            Search
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setSearch("");
              setSearchTerm("");
            }}
          >
            Reset
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </ButtonToolbar>
  );
};

export default SearchBar;
