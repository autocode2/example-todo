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

## Template

Create-next-app with typescript and shadcn/ui.  The full template is sent as context.

# Model Response

Certainly! I'll create a simple todo app using TypeScript, Next.js, Tailwind CSS, and the components provided in the context. I'll break this down into steps and create the necessary files.

Let's start by creating the main components and pages:

1. First, let's create a new page for our todo app:
Creating file:  src/app/todo/page.tsx
2. Now, let's create the main TodoApp component:
Creating file:  src/components/TodoApp.tsx
3. Let's create the TodoForm component:
Creating file:  src/components/TodoForm.tsx
4. Now, let's create the TodoList component:
Creating file:  src/components/TodoList.tsx
Now that we have created all the necessary components, let's update the main page to include our todo app:
Replacing file:  src/app/page.tsx
Great! Now we have a fully functional todo app with all the requested features:

1. You can add a todo using the form at the top.
2. You can delete a todo using the "Delete" button next to each todo.
3. You can update a todo by clicking the "Edit" button, which turns the todo text into an editable input.
4. You can see a list of todos.
5. You can mark a todo as complete by clicking the checkbox next to it.
6. You can filter todos by clicking the "All", "Active", or "Completed" buttons.
7. You can see the count of complete and incomplete todos at the bottom of the list.

The app uses TypeScript for type safety, Next.js for the framework, Tailwind CSS for styling, and the provided UI components (like Button) from the shadcn/ui library.

To use this app, you can navigate to the `/todo` route, which will display the todo app interface. The main page (`/`) now has a link to the todo app for easy navigation.

Is there anything else you'd like to add or modify in the todo app?

Model: claude-3-5-sonnet-20240620
Tokens: 0 (631035 input, 2370 output)
Cost:  1.928655 (1.893105 input, 0.03555 output)
