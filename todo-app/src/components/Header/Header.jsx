import './Header.css'

function Header({ newTodo, setNewTodo, handleKeyPress, addTodo }) {
    return (
            <div className="app-title">
                <h1>🍅 Todo App</h1>
                <div className="todo-input-container">
                    <input 
                        type="text" 
                        className="todo-input"
                        placeholder="Add a new todo..." 
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button className="add-button" onClick={addTodo}>
                        Add Todo
                    </button>
                </div>
            </div>
    )
}

export default Header