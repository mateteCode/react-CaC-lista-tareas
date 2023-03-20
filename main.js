const addTaskBtn = document.querySelector(".btn-new-task");
const createTaskBtn = document.querySelector(".btn-create-task");
const taskInput = document.querySelector("textarea");
const checkPriority = document.querySelector("#remember-me");

let taskList = [
  {
    name: "Para hacer",
    color: "green",
    tasks: [],
    max: 0,
  },
  {
    name: "Haciendo",
    color: "green",
    tasks: [],
    max: 0,
  },
  {
    name: "En espera",
    color: "green",
    tasks: [],
    max: 0,
  },
  {
    name: "Terminadas",
    color: "green",
    tasks: [],
    max: 0,
  },
];

const maxLists = 5;

document.body.onload = () => {
  let taskListSelect = document.querySelector("#taskListSelect");
  taskList.forEach((value, index) => {
    const option = document.createElement("option");
    option.setAttribute("value", index);
    option.textContent = value.name;
    if (index == 0) {
      option.setAttribute("selected", true);
    }
    taskListSelect.appendChild(option);
  });
};

function addList(name, color, max) {
  let result;
  if (taskList.length < maxLists) {
    const list = {};
    list.name = name;
    list.color = color;
    list.taks = [];
    list.max = max;
    result = taskList.push(list);
  }
  console.log(result);
}

createTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = taskInput.value;
  const priority = checkPriority.checked;
  if (text !== "") {
    const listIndex = document.querySelector("#taskListSelect").value;
    const parent = document.querySelector("#tasks" + listIndex);
    if (priority) {
      parent.insertBefore(addNewTask(text, priority), parent.firstChild);
    } else {
      parent.appendChild(addNewTask(text, priority));
    }
    taskInput.value = "";
    document.querySelector(".popup").classList.remove("active");
    document.querySelector("#tasks" + listIndex + " .empty").style.display =
      "none";
  }
});

function generateColor() {
  colors = [
    "#ff7eb9",
    "#ff65a3",
    "#7afcff",
    "#feff9c",
    "#fff740",
    "#a1c8e9",
    "#d2d7ff",
    "#d6e3ff",
    "#ddf2ff",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function addNewTask(text, priority) {
  const divTask = document.createElement("div");
  divTask.className = "task";

  const divTaskPriority = document.createElement("div");
  divTaskPriority.className = "taskPriority";

  const iconPriority = document.createElement("i");
  iconPriority.className = "fa fa-thumb-tack";
  iconPriority.setAttribute("aria-hidden", "true");

  divTaskPriority.appendChild(iconPriority);
  if (!priority) {
    divTaskPriority.style.display = "none";
  }

  const divTaskMenu = document.createElement("div");
  divTaskMenu.className = "taskMenu";

  const a1 = document.createElement("a");
  a1.setAttribute("href", "#");

  const iconEdit = document.createElement("i");
  iconEdit.className = "fa fa-pencil";
  iconEdit.setAttribute("aria-hidden", "true");

  a1.appendChild(iconEdit);

  const a2 = document.createElement("a");
  a1.setAttribute("href", "#");

  const iconDelete = document.createElement("i");
  iconDelete.className = "fa fa-trash";
  iconDelete.setAttribute("aria-hidden", "true");

  a2.appendChild(iconDelete);
  a2.addEventListener("click", (e) => {
    e.preventDefault();
    const task = e.currentTarget.parentElement.parentElement;
    const parent = task.parentElement;
    parent.removeChild(task);
    if (parent.querySelectorAll(".task").length == 0) {
      parent.querySelector(".empty").style.display = "block";
    }
  });

  divTaskMenu.appendChild(a1);
  divTaskMenu.appendChild(a2);

  const p = document.createElement("p");
  p.textContent = text;

  divTask.appendChild(divTaskPriority);
  divTask.appendChild(divTaskMenu);
  divTask.appendChild(p);

  divTask.style.backgroundColor = generateColor();

  return divTask;
}

addTaskBtn.addEventListener("click", () => {
  document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-btn").addEventListener("click", () => {
  document.querySelector(".popup").classList.remove("active");
});
