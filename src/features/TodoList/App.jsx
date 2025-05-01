import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;
  const token = `Bearer ${import.meta.env.VITE_PAT || ""}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      if (!token || token === "Bearer ") {
        console.error("Missing API token.");
        setErrorMessage(
          "Missing API token."
        );
        setIsLoading(false);
        return;
      }

      try {
        const resp = await fetch(url, {
          method: "GET",
          headers: { Authorization: token },
        });

        if (!resp.ok) {
          const errorText = await resp.text();
          console.error("Failed to fetch todos:", errorText);
          throw new Error(resp.statusText || "Failed to fetch todos");
        }

        const data = await resp.json();

        const fetchedTodos = data.records.map((record) => ({
          id: record.id,
          title: record.fields.title || "Untitled",
          isCompleted: record.fields.isCompleted ?? false,
        }));

        setTodos(fetchedTodos);
      } catch (err) {
        console.error("Error fetching todos:", err);
        setErrorMessage(`Failed to load todos: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [url, token]);

  const handleAddTodo = async (newTodo) => {
    setIsSaving(true);

    try {
      if (!token || token === "Bearer ") {
        throw new Error(
          "Missing API token."
        );
      }

      const payload = {
        records: [
          {
            fields: {
              title: newTodo.title,
              isCompleted: false,
            },
          },
        ],
      };

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("Error adding todo:", errorText);
        throw new Error(errorText || resp.statusText);
      }

      const data = await resp.json();

      const added = {
        id: data.records[0].id,
        title: data.records[0].fields.title,
        isCompleted: data.records[0].fields.isCompleted ?? false,
      };

      setTodos((prev) => [...prev, added]);
    } catch (err) {
      console.error("Add todo error:", err);
      setErrorMessage(`Failed to add todo: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompleteTodo = async (id) => {
    const todoToUpdate = todos.find((t) => t.id === id);
    if (!todoToUpdate) return;

    const updated = {
      ...todoToUpdate,
      isCompleted: !todoToUpdate.isCompleted,
    };

    try {
      const resp = await fetch(`${url}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              id,
              fields: { isCompleted: updated.isCompleted },
            },
          ],
        }),
      });

      if (!resp.ok) {
        throw new Error("Failed to update completion status");
      }

      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error("Completion update error:", err);
      setErrorMessage("Failed to update todo completion");
    }
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const resp = await fetch(`${url}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              id: updatedTodo.id,
              fields: {
                title: updatedTodo.title,
              },
            },
          ],
        }),
      });

      if (!resp.ok) {
        throw new Error("Failed to update todo");
      }

      setTodos((prev) =>
        prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
    } catch (err) {
      console.error("Update todo error:", err);
      setErrorMessage("Failed to update todo title");
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} isSaving={isSaving} />
      {isLoading ? (
        <p>Loading todos...</p>
      ) : (
        <>
          <TodoList
            todos={todos}
            isLoading={isLoading}
            onCompleteTodo={handleCompleteTodo}
            onUpdateTodo={handleUpdateTodo}
          />
          {todos.length === 0 && <p>No todos available.</p>}
        </>
      )}
      {errorMessage && (
        <div className="error-container">
          <hr />
          <p className="error-message">{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
