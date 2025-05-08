import React, { useState, useEffect } from "react";
import TodoList from "./features/TodoList";
import TodosViewForm from "./features/TodosViewForm";
import TodoForm from "./TodoList/TodoForm";

const encodeUrl = ({ sortField, sortDirection, searchQuery, url }) => {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  let searchFilter = "";

  if (searchQuery) {
    searchFilter = `&filterByFormula=SEARCH("${searchQuery}", title)`;
  }

  return encodeURI(`${url}?${sortQuery}${searchFilter}`);
};


const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;
  const token = `Bearer ${import.meta.env.VITE_PAT || ""}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      if (!token || token === "Bearer ") {
        setErrorMessage("Missing API token.");
        setIsLoading(false);
        return;
      }

      try {
        const encodedUrl = encodeUrl({
          url,
          sortField,
          sortDirection,
          searchQuery,
        });

        const resp = await fetch(encodedUrl, {
          headers: { Authorization: token },
        });

        if (!resp.ok) throw new Error(await resp.text());

        const data = await resp.json();

       const fetchedTodos = data.records.map((record) => ({
         id: record.id,
         title: record.fields.title,
         createdTime: record.fields.createdTime,
       }));


        setTodoList(fetchedTodos);
      } catch (err) {
        setErrorMessage(`Failed to load todos: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [sortField, sortDirection, searchQuery]);

  const handleAddTodo = async (newTodo) => {
    setIsSaving(true);
    try {
      const payload = {
        records: [{ fields: { title: newTodo.title, isCompleted: false } }],
      };

      const encodedUrl = encodeUrl({
        url,
        sortField,
        sortDirection,
        searchQuery,
      });

      const resp = await fetch(encodedUrl, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error(await resp.text());

      const data = await resp.json();
      const added = {
        id: data.records[0].id,
        title: data.records[0].fields.title,
        isCompleted: false,
        createdTime: data.records[0].fields.createdTime,
      };

      setTodoList((prev) => [...prev, added]);
    } catch (err) {
      setErrorMessage(`Failed to add todo: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    setIsSaving(true);

    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodoList(updatedTodos);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
            createdTime: editedTodo.createdTime || originalTodo.createdTime,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {

      const encodedUrl = encodeUrl({
        url,
        sortField,
        sortDirection,
        searchQuery,
      });

      const resp = await fetch(encodedUrl, options);

      if (!resp.ok) throw new Error(await resp.text());

      await resp.json();
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }
  };

  const completeTodo = async (id) => {
    setIsSaving(true);

    const originalTodo = todoList.find((todo) => todo.id === id);

    const updatedTodo = {
      ...originalTodo,
      isCompleted: !originalTodo.isCompleted,
    };

    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );
    setTodoList(updatedTodos);

    const payload = {
      records: [
        {
          id: updatedTodo.id,
          fields: {
            title: updatedTodo.title,
            isCompleted: updatedTodo.isCompleted,
            createdTime: updatedTodo.createdTime,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const encodedUrl = encodeUrl({
        url,
        sortField,
        sortDirection,
        searchQuery,
      });

      const resp = await fetch(encodedUrl, options);

      if (!resp.ok) throw new Error(await resp.text());

      await resp.json();
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo completion status`);

      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? originalTodo : todo
      );
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Todo App</h1>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {errorMessage}
          <button
            onClick={() => setErrorMessage("")}
            style={{ marginLeft: "1rem" }}
          >
            Dismiss
          </button>
        </div>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", padding: "0.25rem" }}
        />
      </div>
      <TodoForm handleAddTodo={handleAddTodo} isSaving={isSaving} />

      <TodoList
        todos={todoList}
        onComplete={completeTodo}
        onUpdate={updateTodo}
        isLoading={isLoading}
      />

      <hr />
      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>
  );
};

export default TodoApp;
