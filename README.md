# Auto Code Example - To Do App

**Model**: claude-3-haiku-20240307

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


# Model Response

Okay, let's build a simple React todo app with the requested features. Here's how we can do it:
Creating file:  index.html
Creating file:  src/App.js
The key features of this todo app are:

1. **Add Todo**: Users can add a new todo by typing in the input field and pressing Enter or clicking the "Add Todo" button.
2. **Delete Todo**: Users can delete a todo by clicking the "Delete" button next to the todo.
3. **Update Todo**: Users can update a todo by editing the text in the input field next to the todo.
4. **Mark as Complete**: Users can mark a todo as complete by checking the checkbox next to the todo.
5. **Filter Todos**: Users can filter the todos by "All", "Completed", or "Incomplete" using the buttons provided.
6. **Todo Counts**: The app displays the count of completed and incomplete todos.

The app uses React's `useState` hook to manage the state of the todo list, including the new todo input, the list of todos, and the current filter. The `filteredTodos` function is used to display the appropriate todos based on the selected filter.

To run this app, save the `index.html` and `App.js` files, then open the `index.html` file in a web browser. You should see the todo app running.
