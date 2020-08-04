// *Collect All UI Elements
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

// *Add to do
todoForm.addEventListener("submit", addTodo);
//* Delete to do
todoList.addEventListener("click", deleteToDo);

function addTodo(e) {
  e.preventDefault();

  if (todoInput.value) {
      
      //? Creating li element  
    const li = document.createElement("li");
    
    //? Add class to element li
    li.className =
      "list-group-item d-flex justify-content-between align-items-center mb-1";
    
      //? Add children element to inside element li
      li.appendChild(document.createTextNode(todoInput.value))
    
      //? Add delete button
      const a = document.createElement("a");
      //? Create properti to element a
      a.href = "#";
      a.className = "badge badge-danger delete-todo";
      a.innerHTML = "Delete";
    
      //? Add element a to children element li
      li.appendChild(a);
    
      //? Input element li to element todoList
      todoList.appendChild(li)
      //? cleaning text input form after input todo 
      todoInput.value = ""
  } else {
      alert("Please insert your task, cannot be empty task")
  }

}

function deleteToDo(e) {
    e.preventDefault();
    if (e.target.classList.contains("delete-todo")) {
        if (confirm("Are you sure want to delete this task?")) {
            const parent = e.target.parentElement;
            parent.remove();

        }
    }
}