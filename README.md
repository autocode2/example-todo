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

Certainly! I'll create a simple todo app using TypeScript, Next.js, Tailwind CSS, and the components provided in the context. I'll break this down into steps and create the necessary files.

Let's start by creating the main components and pages:

1. First, let's create a new file for our Todo type and some utility functions:
Creating file:  src/lib/todos.ts
2. Now, let's create a TodoItem component:
Creating file:  src/components/TodoItem.tsx
3. Now, let's update the main page component:
Replacing file:  src/app/page.tsx
Now that we have created the necessary components and updated the main page, let's explain the implementation:

1. We created a `todos.ts` file in the `src/lib` directory to define the `Todo` interface and a utility function to generate unique IDs.

2. We created a `TodoItem` component in `src/components/TodoItem.tsx`. This component handles the rendering of individual todo items, including the ability to toggle completion, edit, and delete todos.

3. We updated the main `page.tsx` file to implement the todo app functionality:
   - We use the `useState` hook to manage the state of todos, new todo input, and filter.
   - The `addTodo` function creates a new todo item.
   - The `toggleTodo` function marks a todo as complete or incomplete.
   - The `deleteTodo` function removes a todo from the list.
   - The `editTodo` function updates the text of a todo.
   - We implemented filtering functionality to show all, active, or completed todos.
   - We display the count of active and completed todos at the bottom.

4. We used the `Button` component from the provided UI components to create consistent button styles.

5. We used Tailwind CSS classes for styling the components and layout.

This implementation covers all the requirements:
- You can add, delete, and update todos.
- You can see a list of todos.
- You can mark a todo as complete.
- You can filter todos by complete and incomplete.
- You can see the count of complete and incomplete todos.

The app is built using TypeScript, Next.js, Tailwind CSS, and the provided UI components. It's a client-side rendered app, as indicated by the 'use client' directive at the top of the page component.

To run this app, make sure you have all the necessary dependencies installed, and then use the `npm run dev` command to start the development server. You should be able to see and interact with the todo app in your browser.
Model: claude-3-5-sonnet-20240620
Tokens: 0 (36215 input, 2268 output)
Cost:  0.14266500000000001 (0.108645 input, 0.03402 output)
