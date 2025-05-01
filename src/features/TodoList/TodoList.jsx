import TodoListItem from "./TodoListItem";

const TodoList = ({
  todos = [],
  isLoading = false,
  onCompleteTodo,
  onUpdateTodo,
}) => {
  if (isLoading) {
    return <div className="loading">Loading todos...</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo} 
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
