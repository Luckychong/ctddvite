import React from "react";

const TodosViewForm = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
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
      <div className="mb-2">
        <label htmlFor="search">Search todos:</label>
        <input
          id="search"
          type="text"
          value={queryString || ""}
          onChange={(e) => setQueryString(e.target.value)}
          className="mx-2 border rounded px-2 py-1"
        />
        <button
          type="button"
          onClick={clearQuery}
          className="border px-2 py-1 rounded"
        >
          Clear
        </button>
      </div>
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
          className="mx-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
};

export default TodosViewForm;
