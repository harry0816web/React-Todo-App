import { useState } from 'react'
import Todos from '../Todos/Todos'
import './TodoWrapper.css'

function TodoWrapper() {
    // 將 todos 改為物件陣列，每個 todo 有 id, text, completed 屬性
    const [todos, setTodos] = useState([
        { id: 1, text: 'Todo 1', completed: false },
        { id: 2, text: 'Todo 2', completed: false },
        { id: 3, text: 'Todo 3', completed: false }
    ])
    const [newTodo, setNewTodo] = useState('')

    const addTodo = () => {
        if (newTodo.trim()) {
            const newTodoObj = {
                id: Date.now(), // 使用時間戳作為唯一 ID
                text: newTodo,
                completed: false
            }
            setTodos([...todos, newTodoObj])
            setNewTodo('')
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo()
        }
    }

    // 切換 todo 的完成狀態
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id 
                ? { ...todo, completed: !todo.completed }
                : todo
        ))
    }

    // 刪除 todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <div className="app-container">
            <h1>🍅 Todo App</h1>
            
            <div className="todo-input-container">
                <input 
                    type="text" 
                    className="todo-input"
                    placeholder="Add a new todo..." 
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="add-button" onClick={addTodo}>
                    Add Todo
                </button>
            </div>
        
            <Todos 
                todos={todos} 
                onToggle={toggleTodo}
                onDelete={deleteTodo}
            />
        </div>
    )
}

export default TodoWrapper