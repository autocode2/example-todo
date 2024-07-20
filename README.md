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

Okay, let's build a simple todo app with the requirements you provided. Here's how we can do it:
Creating file:  src/components/todo-app.tsx
The key components of the todo app are:

1. **TodoApp Component**: This is the main component that manages the state of the todos, handles adding, deleting, and updating todos, as well as filtering the todos.

2. **Todo Interface**: This defines the shape of a todo item, with an id, text, and completed status.

3. **Input and Button**: These are the UI components used for adding a new todo.

4. **Todo List**: This is the list of todos, rendered using the `filteredTodos` array. Each todo item has a checkbox to mark it as complete, and a delete button.

5. **Filtering**: The app provides buttons to filter the todos by "All", "Completed", and "Incomplete".

6. **Completion Counts**: The app displays the count of completed and incomplete todos.

The app uses the `useState` hook to manage the state of the todos, the new todo input, and the current filter. The `addTodo`, `deleteTodo`, and `toggleTodo` functions handle the CRUD operations on the todos, while the `filteredTodos` variable filters the todos based on the selected filter.

The UI components, such as the `Button` and the checkbox, are imported from the provided components in the context.

To use this todo app, you can import the `TodoApp` component into your page and render it:
Replacing file:  src/app/page.tsx
This will render the todo app on the homepage. You can now add, delete, and update todos, as well as filter and view the completion counts.
Model: claude-3-haiku-20240307
Tokens: 0 (27667 input, 1634 output)
Cost:  0.00895925 (0.00691675 input, 0.0020425 output)
