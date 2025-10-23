# Todo App 開發日誌

## 2024-12-19 - 重構組件架構與實現單向資料流

### 🎯 目標
- 重構 Todo App 的組件架構
- 實現 React 單向資料流原則
- 添加 todo 項目的互動功能（切換完成狀態、刪除）

### 📁 新增文件

#### 1. `src/components/Todo/Todo.jsx`
- **功能**：單個 todo 項目的組件
- **特色**：
  - 接收 `todo` 物件作為 props
  - 實現點擊切換完成狀態功能
  - 添加刪除按鈕
  - 使用 `e.stopPropagation()` 防止事件冒泡

```jsx
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
          e.stopPropagation()
          onDelete(todo.id)
        }}
      >
        🗑️
      </button>
    </li>
  )
}
```

#### 2. `src/components/Todo/Todo.css`
- **功能**：Todo 組件的樣式
- **特色**：
  - 完成狀態的視覺回饋（刪除線、✅ 圖標）
  - 懸停效果和動畫
  - 響應式設計

### 🔄 修改文件

#### 1. `src/components/Todos/Todos.jsx`
**修改前**：
```jsx
function Todos({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <li key={index} className="todo-item">
          {todo}
        </li>
      ))}
    </ul>
  )
}
```

**修改後**：
```jsx
function Todos({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
```

**變更**：
- 導入 `Todo` 組件
- 接收 `onToggle` 和 `onDelete` 回調函數
- 使用 `todo.id` 作為 key（而不是 index）
- 將 todo 物件傳遞給 `Todo` 組件

#### 2. `src/components/TodoWrapper/TodoWrapper.jsx`
**主要變更**：

1. **資料結構改變**：
```jsx
// 修改前：字串陣列
const [todos, setTodos] = useState(['Todo 1', 'Todo 2', 'Todo 3'])

// 修改後：物件陣列
const [todos, setTodos] = useState([
    { id: 1, text: 'Todo 1', completed: false },
    { id: 2, text: 'Todo 2', completed: false },
    { id: 3, text: 'Todo 3', completed: false }
])
```

2. **新增事件處理函數**：
```jsx
// 切換 todo 完成狀態
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
```

3. **更新 addTodo 函數**：
```jsx
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
```

4. **傳遞回調函數給子組件**：
```jsx
<Todos 
    todos={todos} 
    onToggle={toggleTodo}
    onDelete={deleteTodo}
/>
```

### 🎨 設計原則實現

#### 1. **單向資料流**
- 狀態管理在 `TodoWrapper`（頂層組件）
- 資料通過 props 向下傳遞
- 事件通過回調函數向上傳遞

#### 2. **組件職責分離**
- `TodoWrapper`：狀態管理和業務邏輯
- `Todos`：列表渲染
- `Todo`：單個項目渲染和互動

#### 3. **可重用性**
- `Todo` 組件可以在其他地方重用
- 不依賴特定的父組件狀態

### 🚀 新功能

1. **點擊切換完成狀態**：點擊 todo 項目可以標記為完成/未完成
2. **視覺回饋**：完成的 todo 顯示刪除線和 ✅ 圖標
3. **刪除功能**：點擊 🗑️ 按鈕可以刪除 todo
4. **事件冒泡控制**：刪除按鈕不會觸發 todo 的切換事件

### 📱 用戶體驗改善

- 更直觀的互動方式
- 清晰的視覺狀態指示
- 流暢的動畫效果
- 響應式設計

### 🔧 技術細節

- 使用 `Date.now()` 生成唯一 ID
- 使用 `e.stopPropagation()` 防止事件冒泡
- 使用 `map()` 和 `filter()` 進行不可變更新
- CSS 類別條件渲染 (`${todo.completed ? 'completed' : ''}`)

### 📝 下一步計劃

- [ ] 添加本地儲存功能
- [ ] 實現編輯 todo 功能
- [ ] 添加篩選功能（全部/已完成/未完成）
- [ ] 添加拖拽排序功能
