import React, { useState } from "react";
import { ButtonToolbar, InputGroup, Button, FormControl } from "react-bootstrap";

const SearchBar = ({ setSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <ButtonToolbar className="mb-3 w-100">
      <InputGroup className="w-100">
        <FormControl
          type="text"
          className="elevated"
          style={{ flex: 1 }}
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
