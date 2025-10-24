import Todo from '../Todo/Todo'

function Todos({ todos, onToggle, onDelete, onTimer }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle}
          onDelete={onDelete}
          onTimer={onTimer}
        />
      ))}
    </ul>
  )
}

export default Todos