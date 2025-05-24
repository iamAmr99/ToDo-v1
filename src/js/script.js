let todoAdd = document.getElementById("todoAdd");
let todoDisplay = document.getElementById("todoDisplay");
let todoInput = document.getElementById("todoInput");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
renderList();

function renderList() {
  todoDisplay.innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    todoDisplay.innerHTML += `
      <div class="form-check todo-task">
        <input class="form-check-input todo-checkbox" type="checkbox" />
        <label class="form-check-label">${todoList[i]}</label>
      </div>`;
  }
}

todoAdd.addEventListener("click", () => {
  if (todoInput.value === "") {
    todoInput.style.border = "3px solid red";
    return;
  } else {
    todoInput.style.border = "";
  }

  todoList.push(todoInput.value);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  todoInput.value = "";
  renderList();
});

addEventListener("click", (e) => {
  if (e.target.classList.contains("todo-checkbox")) {
    e.target.nextElementSibling.style.textDecoration = "line-through";
    e.target.nextElementSibling.style.textDecorationThickness = "3px";

    const taskText = e.target.nextElementSibling.textContent;
    const index = todoList.indexOf(taskText);
    if (index > -1) {
      todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
    e.target.closest(".todo-task").style.opacity = "0.5";
    setTimeout(() => {
      e.target.closest(".todo-task").remove();
    }, 500);
  }
});