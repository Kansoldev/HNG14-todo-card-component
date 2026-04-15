# Todo Card Component

A simple Todo Card component built with **HTML, CSS, and JavaScript**.
It allows users mark a task as complete, updating it's status visually by crossing out the title and changing the current status of the todo.

## How to Run Locally

1. **Clone or download the repository**

   ```bash
   git clone https://github.com/Kansoldev/HNG14-todo-card-component
   ```

2. **Navigate into the project folder**

   ```bash
   cd HNG14-todo-card-component
   ```

3. **Open the project**
   - Double-click the `index.html` file
     **OR**
   - Right-click → Open with your browser

No build tools or dependencies are required.

---

## Decisions Made

- **Vanilla JavaScript only** to keep the project lightweight and beginner-friendly.

- **Separation of concerns**
  - HTML handles structure
  - CSS handles styling
  - JavaScript handles interactivity

- **Checkbox-driven state**
  Used a checkbox input to manage the completed state since it naturally represents a "done/undone" action.

- **CSS class toggling for UI updates**:
  Instead of manipulating styles directly in JavaScript, a class is toggled to:
  - Strike through the task title
  - Change status color and text

---

## Trade-offs

- **No persistence**
  The todo state resets on page reload since there’s no local storage or backend integration.

- **Single todo only**
  This component handles just one todo item. Scaling to multiple todos would require additional structure (like an array).

- **No component abstraction**
  Since this is plain HTML, it’s not reusable in the same way as a component in frameworks like React.
