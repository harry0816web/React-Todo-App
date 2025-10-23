import './Todo.css'

function Todo({ todo, onToggle, onDelete }) {
  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      onClick={() => onToggle(todo.id)}
    >
      <span className="todo-text">{todo.text}</span>
      <button 
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation() // 防止觸發 li 的 onClick
          onDelete(todo.id)
        }}
      >
        🗑️
      </button>
    </li>
  )
}

export default Todo
