let form = document.forms;
let input = document.querySelector(".input");
let color = document.querySelector(".color");
let submit = document.querySelector(".add");
let result = document.querySelector(".tasks");

window.onload = function () {
  input.focus();
};

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    color.focus();
  }
});

let arrayOfTasks = [];

form[0].onsubmit = function (e) {
  e.preventDefault();
  if (input.value != "") {
    addTaskToArray(input.value.toLowerCase(), color.value.toLowerCase());
    input.value = "";
    color.value = "";
    input.focus();
  }
};

if (localStorage.getItem("Element")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("Element"));
}
getDataFromLocalStorage();

result.addEventListener("click", (el) => {
  if (el.target.classList.contains("del")) {
    deletefromloaclstorege(el.target.parentElement.getAttribute("data-id"));
    el.target.parentElement.remove();
  }
  if (el.target.classList.contains("box")) {
    ToggleStatusTaskWith(el.target.getAttribute("data-id"));
    el.target.classList.toggle("done");
  }
  if (el.target.classList.contains("clear")) {
    clearAll();
  }
});

function addTaskToArray(testtext, colortext) {
  let text = {
    id: Date.now(),
    title: testtext,
    color: colortext,
    completed: false,
  };
  arrayOfTasks.push(text);
  addElToPageFrom(arrayOfTasks);
  addtasksToloacalStorageFrom(arrayOfTasks);
}

function addElToPageFrom(tasks) {
  result.innerHTML = "";
  tasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "box";
    div.setAttribute("data-id", task.id);
    let textnode = document.createTextNode(task.title);
    div.appendChild(textnode);
    div.style.backgroundColor = task.color;
    input.placeholder.color = task.color;
    if (task.color === "black") {
      div.style.color = "white";
    }
    if (task.completed) {
      div.className = "box done";
    }
    let del = document.createElement("button");
    del.className = "del";
    del.appendChild(document.createTextNode("Delete"));
    div.appendChild(del);
    result.appendChild(div);
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

function addtasksToloacalStorageFrom(tasks) {
  window.localStorage.setItem("Element", JSON.stringify(tasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("Element");
  if (data) {
    let ELement = JSON.parse(data);
    addElToPageFrom(ELement);
  }
}
function deletefromloaclstorege(taskid) {
  arrayOfTasks = arrayOfTasks.filter((tasks) => tasks.id != taskid);
  addtasksToloacalStorageFrom(arrayOfTasks);
  addElToPageFrom(arrayOfTasks);
}
function ToggleStatusTaskWith(taskid) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskid) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addtasksToloacalStorageFrom(arrayOfTasks);
}

function clearAll() {
  arrayOfTasks = [];
  addtasksToloacalStorageFrom(arrayOfTasks);
  addElToPageFrom(arrayOfTasks);
}
