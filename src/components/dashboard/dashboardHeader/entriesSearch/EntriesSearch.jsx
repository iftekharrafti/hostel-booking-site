import React from "react";
import { Form } from "react-bootstrap";
import Style from './entriesSearch.module.css';

const EntriesSearch = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="d-flex align-items-center">
        <p className="mt-3 me-2">Show</p>
        <Form.Select
          className={Style.select}
          aria-label="Default select example"
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value="all">All</option>
        </Form.Select>
        <p className="mt-3 ms-2">entries</p>
      </div>
      <div className="d-flex align-items-center">
        <p className="mt-3 me-2">Search: </p>
        <input type="text" className={`${Style.input} me-3`} />
      </div>
    </div>
  );
};

export default EntriesSearch;
