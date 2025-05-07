import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, isLoading, onToggleComplete, onUpdateTodo }) => {
  return (
    <ul>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        todos.map((todo) => (
          <li key={todo.id}>
            <TodoListItem
              todo={todo}
              onCompleteTodo={onToggleComplete}
              handleUpdate={(e) => {
                e.preventDefault();
                onUpdateTodo(todo);
              }}
              setIsEditing={() => {}}
              isEditing={false}
              handleCancel={() => {}}
              handleEdit={() => {}}
            />
          </li>
        ))
      )}
    </ul>
  );
};

export default TodoList;
