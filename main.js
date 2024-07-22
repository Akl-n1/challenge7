let form = document.forms;
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let result = document.querySelector(".tasks");

window.onload = function () {
  input.focus()
};

let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

GetDataFromLocalstorage();

form[0].onsubmit = function (el) {
  el.preventDefault();
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

result.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("box")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
  if (e.target.classList.contains("clear")) {
    clearAllTasks();
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementTopagefrom(arrayOfTasks);
  addDataToLocalstoragefrom(arrayOfTasks);
}

function addElementTopagefrom(arrayOfTasks) {
  result.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let box = document.createElement("div");
    box.className = "box";
    if (task.completed) {
      box.className = "box done";
    }
    box.setAttribute("data-id", task.id);
    box.appendChild(document.createTextNode(task.title));
    let button = document.createElement("button");
    button.className = "del";
    button.appendChild(document.createTextNode("Delete"));
    box.appendChild(button);
    result.appendChild(box);
  });

  let clearSpan = document.querySelector(".clear");
  if (arrayOfTasks.length > 1) {
    if (!clearSpan) {
      clearSpan = document.createElement("span");
      clearSpan.className = "clear";
      clearSpan.appendChild(document.createTextNode("Delete All"));
      result.appendChild(clearSpan);
    }
  } else {
    if (clearSpan) {
      clearSpan.remove();
    }
  }
}

function addDataToLocalstoragefrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function GetDataFromLocalstorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementTopagefrom(tasks);
  }
}

function deleteTaskWith(TaskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != TaskId);
  addDataToLocalstoragefrom(arrayOfTasks);
  addElementTopagefrom(arrayOfTasks);
}

function toggleStatusTaskWith(TaskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == TaskId) {
      arrayOfTasks[i].completed = !arrayOfTasks[i].completed;
    }
  }
  addDataToLocalstoragefrom(arrayOfTasks);
}

function clearAllTasks() {
  arrayOfTasks = [];
  addDataToLocalstoragefrom(arrayOfTasks);
  addElementTopagefrom(arrayOfTasks);
}

// localStorage.clear("task")