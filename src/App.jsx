import React, { useState, useEffect } from "react";
import TodoList from "./features/TodoList/TodoList";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);
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
        setErrorMessage("Missing API token.");
        setIsLoading(false);
        return;
      }

      try {
        const resp = await fetch(url, {
          headers: { Authorization: token },
        });

        if (!resp.ok) throw new Error(await resp.text());

        const data = await resp.json();
        const fetchedTodos = data.records.map((record) => ({
          id: record.id,
          title: record.fields.title,
          isCompleted: record.fields.isCompleted ?? false,
        }));

        setTodoList(fetchedTodos);
      } catch (err) {
        setErrorMessage(`Failed to load todos: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    setIsSaving(true);
    try {
      const payload = {
        records: [{ fields: { title: newTodo.title, isCompleted: false } }],
      };

      const resp = await fetch(url, {
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
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList([...updatedTodos]);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
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
      const resp = await fetch(url, options);

      if (!resp.ok) throw new Error(await resp.text());

      const { records } = await resp.json();

      const updatedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };

      if (!records[0].fields.isCompleted) {
        updatedTodo.isCompleted = false;
      }

      const refreshedTodos = todoList.map((todo) =>
        todo.id === updatedTodo.id ? { ...updatedTodo } : todo
      );

      setTodoList([...refreshedTodos]);
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? { ...originalTodo } : todo
      );

      setTodoList([...revertedTodos]);
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
      todo.id === id ? { ...updatedTodo } : todo
    );
    setTodoList([...updatedTodos]);

    const payload = {
      records: [
        {
          id: updatedTodo.id,
          fields: {
            title: updatedTodo.title,
            isCompleted: updatedTodo.isCompleted,
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
      const resp = await fetch(url, options);

      if (!resp.ok) throw new Error(await resp.text());

      const { records } = await resp.json();

      const confirmedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };

      if (!records[0].fields.isCompleted) {
        confirmedTodo.isCompleted = false;
      }

      const refreshedTodos = todoList.map((todo) =>
        todo.id === confirmedTodo.id ? { ...confirmedTodo } : todo
      );

      setTodoList([...refreshedTodos]);
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo completion status`);

      const revertedTodos = todoList.map((todo) =>
        todo.id === originalTodo.id ? { ...originalTodo } : todo
      );

      setTodoList([...revertedTodos]);
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.elements.newTodo;
          const value = input.value.trim();
          if (value) {
            handleAddTodo({ title: value });
            input.value = "";
          }
        }}
      >
        <input name="newTodo" placeholder="New todo" />
        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Add"}
        </button>
      </form>

      <TodoList
        todos={todoList}
        isLoading={isLoading}
        onToggleComplete={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoApp;
