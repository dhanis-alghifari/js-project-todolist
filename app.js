// *Collect All UI Elements
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

// *Collect all eventlistener

function immediateLoadEventListener() {
  // * get to do from local storage and render to browser
  document.addEventListener("DOMContentLoaded", getTodos);

  // *Add to do
  todoForm.addEventListener("submit", addTodo);
  //* Delete to do
  todoList.addEventListener("click", deleteToDo);
  //* Clear to do
  clearButton.addEventListener("click", clearTodo);
  //* Filter to do
  filterInput.addEventListener("keyup", filterTodo);
}

immediateLoadEventListener();

//* Reusable Code
function createTodoElement(value) {
  //? Creating li element
  const li = document.createElement("li");

  //? Add class to element li
  li.className =
    "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";

  //? Add children element to inside element li
  li.appendChild(document.createTextNode(value));

  //? Add delete button
  const a = document.createElement("a");
  //? Create properti to element a
  a.href = "#";
  a.className = "badge badge-danger delete-todo";
  a.innerHTML = "Delete";

  //? Add element a to children element li
  li.appendChild(a);

  //? Input element li to element todoList
  todoList.appendChild(li);
}

function getItemFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

//* CRUD To Do List
function addTodo(e) {
  e.preventDefault();

  if (todoInput.value) {
    createTodoElement(todoInput.value);

    //? Save todo to local storage
    addTodoLocalStorage(todoInput.value);

    //? cleaning text input form after input todo
    todoInput.value = "";
  } else {
    alert("Please insert your task, cannot be empty task");
  }
}

function addTodoLocalStorage(todoInputValue) {
  const todos = getItemFromLocalStorage();

  todos.push(todoInputValue);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  const todos = getItemFromLocalStorage();

  todos.forEach((todo) => {
    createTodoElement(todo);
  });
}

function deleteToDo(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete-todo")) {
    if (confirm("Are you sure want to delete this task?")) {
      const parent = e.target.parentElement;
      parent.remove();
      deleteTodoLocalStorage(parent)
    }
  }
}

function deleteTodoLocalStorage(deletedElement) {
    const todos = getItemFromLocalStorage(); // delete element parent li

    todos.forEach((todo, index) =>{
        if (deletedElement.firstChild.textContent === todo) {
            todos.splice(index, 1)
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
    
}

function clearTodo() {
  todoList.innerHTML = "";
}

function filterTodo(e) {
  //* Create variable to save input in filter task column
  const filterText = e.target.value.toLowerCase();
  //* Create variable to save element all class todo-item
  const todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((item) => {
    const itemText = item.firstChild.textContent.toLowerCase();
    if (itemText.indexOf(filterText) !== -1) {
      item.setAttribute("style", "display: block;");
    } else {
      item.setAttribute("style", "display: none !important;");
    }
  });
}
