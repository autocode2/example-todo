# Auto Code Example - To Do App

The hello world of web apps. Build a simple todo list.

## Prompts

### Basic Prompt

Build a simple react app which a simple todo app.
 - You should be able to add a todo, delete a todo and update a todo.
 - You should be able to see a list of todos.
 - You should be able to mark a todo as complete.
 - You should be able to filter the todos by complete and incomplete.
 - You should be able to see the count of complete and incomplete.

Generate an index.html and a src/App.js use ES modules and import dependencies from a cdn

## Model Response
Creating file:  index.html
Creating file:  src/App.js
I have created a simple React Todo app for you. Here are the files:

1. **index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="src/App.js"></script>
</body>
</html>
```

2. **src/App.js**:
```javascript
const { useState } = React;

function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');

    const addTodo = () => {
        if (inputValue) {
            setTodos([...todos, { text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const toggleComplete = (index) => {
        const newTodos = todos.map((todo, i) => {
            if (i === index) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
    });

    const completeCount = todos.filter(todo => todo.completed).length;
    const incompleteCount = todos.length - completeCount;

    return (
        <div>
            <h1>Todo App</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={addTodo}>Add Todo</button>
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>
            <ul>
                {filteredTodos.map((todo, index) => (
                    <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                        <button onClick={() => toggleComplete(index)}>Toggle Complete</button>
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <p>Completed: {completeCount}</p>
                <p>Incomplete: {incompleteCount}</p>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

You can run this app in a browser by opening the `index.html` file. Enjoy your Todo app!
Model: gpt-4o-mini
Tokens: 0 (1575 input, 1626 output)
Cost:  0.0012118499999999998 (0.00023625 input, 0.0009755999999999999 output)
