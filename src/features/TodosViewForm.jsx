import React, { useState, useEffect } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

const TodosViewForm = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) => {
  const [inputValue, setInputValue] = useState(queryString || "");

  useEffect(() => {
    setInputValue(queryString || "");
  }, [queryString]);

    useEffect(() => {
      const debounce = setTimeout(() => {
        setQueryString(inputValue);
      }, 500);

      return () => clearTimeout(debounce);
    }, [inputValue, setQueryString]);

   const handleInputChange = (e) => {
     setInputValue(e.target.value); 
   };

   const clearQuery = () => {
     setInputValue("");
     setQueryString("");
   };

   const preventRefresh = (e) => {
     e.preventDefault();
   };

  return (
    <form onSubmit={preventRefresh}>
      <TextInputWithLabel
        id="search"
        label="Search todos:"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="button" onClick={clearQuery}>
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
