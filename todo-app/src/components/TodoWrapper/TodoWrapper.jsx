import { useState, useEffect } from 'react'
import Todos from '../Todos/Todos'
import './TodoWrapper.css'
import Header from '../Header/Header'
import Timer from '../Timer/Timer'
function TodoWrapper() {
    // 將 todos 改為物件陣列，每個 todo 有 id, text, completed 屬性
    const [todos, setTodos] = useState([
        { id: 1, text: 'Todo 1', completed: false },
        { id: 2, text: 'Todo 2', completed: false },
        { id: 3, text: 'Todo 3', completed: false }
    ])
    const [newTodo, setNewTodo] = useState('')
    const [selectedTodo, setSelectedTodo] = useState(null)

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

    // 監聽 todos 變化，為新完成的 todo 設置自動刪除
    useEffect(() => {
        const completedTodos = todos.filter(todo => todo.completed)
        
        completedTodos.forEach(todo => {
            // 設置 5 秒後自動刪除
            const timer = setTimeout(() => {
                setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id))
            }, 5000)
            
            // 清理函數會在組件卸載或依賴變化時執行
            return () => clearTimeout(timer)
        })
    }, [todos])

    // 刪除 todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    // 開啟 Timer
    const openTimer = (id) => {
        const todo = todos.find(todo => todo.id === id)
        setSelectedTodo(todo)
    }

    // 關閉 Timer
    const closeTimer = () => {
        setSelectedTodo(null)
    }

    return (
        <div className="app-container">
            <Header newTodo={newTodo} setNewTodo={setNewTodo} handleKeyPress={handleKeyPress} addTodo={addTodo} />
            <Todos 
                todos={todos} 
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onTimer={openTimer}
            />
            {selectedTodo && (
                <Timer 
                    todo={selectedTodo}
                    onClose={closeTimer}
                />
            )}
        </div>
    )
}

export default TodoWrapper