import React from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

const TodosViewForm = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  setQueryString,
}) => {
  const preventRefresh = (e) => {
    e.preventDefault();
  };

  const clearQuery = () => {
    setQueryString("");
  };

  return (
    <form onSubmit={preventRefresh}>
        <TextInputWithLabel
          id="search"
          label="Search todos:"
          type="text"
          onChange={(e) => setQueryString(e.target.value)}
        />
        <button
          type="button"
          onClick={clearQuery}
        >
          Clear
        </button>
      <div>
        <label htmlFor="sortField">Sort by</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="mx-2"
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="sortDirection">Direction</label>
        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
};

export default TodosViewForm;