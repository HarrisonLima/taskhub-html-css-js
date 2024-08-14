const inputSearch = document.getElementById("input-search");
const inputTask = document.getElementById("input-task");
const inputStart = document.getElementById("input-start");
const inputEnd = document.getElementById("input-end");
const inputDate = document.getElementById("input-date");

const modal = document.getElementById("modal");

const buttonCancel = document.getElementById("button-cancel");
const buttonConfirm = document.getElementById("button-confirm");
const buttonNewTask = document.getElementById("button-new-task");

const tpast = document.getElementById("title-concluidas");
const ttoday = document.getElementById("title-hoje");
const tthisweek = document.getElementById("title-esta-semana");
const tnextweeks = document.getElementById("title-proximas-semanas");
const bpast = document.getElementById("box-concluidas");
const btoday = document.getElementById("box-hoje");
const bthisweek = document.getElementById("box-esta-semana");
const bnextweeks = document.getElementById("box-proximas-semanas");

let tasksConclude = [];
let tasksToday = [];
let tasksThisWeek = [];
let tasksNextWeeks = [];

buttonNewTask.addEventListener("click", (event) => {
  event.preventDefault();
  modal.setAttribute("view", "true");
});

buttonCancel.addEventListener("click", (event) => {
  event.preventDefault();
  clearModal();
  modal.setAttribute("view", "false");
});

buttonConfirm.addEventListener("click", (event) => {
  event.preventDefault();

  const task = {
    task: inputTask.value,
    start: inputStart.value,
    end: inputEnd.value,
    date: inputDate.value,
  };

  if (
    task.task === "" ||
    task.start === "" ||
    task.end === "" ||
    task.date === ""
  ) {
    return alert("Verifique se todos os campos estão preenchidos devidamente!");
  }

  if (task.start > task.end) {
    return alert("Horário inserido inválido!");
  }

  categorizeTask(task);
  clearModal();
  buildApp();
  modal.setAttribute("view", "false");
});

inputSearch.addEventListener("input", () => {
  buildApp();
});

function categorizeTask(task) {
  const taskDateStart = new Date(`${task.date}T${task.start}`);
  const taskDateEnd = new Date(`${task.date}T${task.end}`);
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );
  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(todayStart.getDate() + 1);
  const nextWeekStart = new Date(todayStart);
  nextWeekStart.setDate(todayStart.getDate() + 7);

  if (taskDateEnd < now) {
    tasksConclude.push(task);
  } else if (taskDateStart >= todayStart && taskDateStart < tomorrowStart) {
    tasksToday.push(task);
  } else if (taskDateStart >= tomorrowStart && taskDateStart < nextWeekStart) {
    tasksThisWeek.push(task);
  } else {
    tasksNextWeeks.push(task);
  }
}

function buildCard(task) {
  const card = document.createElement("div");
  const cardHeader = document.createElement("span");
  const cardFooter = document.createElement("span");

  const cardTask = document.createElement("p");
  const cardTime = document.createElement("p");
  const cardDate = document.createElement("p");
  const cardButton = document.createElement("button");

  const formattedDate = formatDate(task.date);
  const taskOverdue = isTaskOverdue(task);

  cardTask.textContent = task.task;
  cardTime.textContent = `${task.start} - ${task.end}`;
  cardDate.textContent = formattedDate;
  cardButton.textContent = taskOverdue ? "Concluído" : "Não concluído";

  card.className = `task task--${taskOverdue ? "done" : "not-done"}`;
  cardHeader.className = "task--date";
  cardFooter.className = "task--button";
  cardButton.className = `button--state button--state-${
    taskOverdue ? "done" : "not-done"
  }`;

  cardHeader.appendChild(cardTime);
  cardHeader.appendChild(cardDate);
  cardFooter.appendChild(cardButton);

  card.appendChild(cardHeader);
  card.appendChild(cardTask);
  card.appendChild(cardFooter);

  return card;
}

function clearModal() {
  inputTask.value = "";
  inputStart.value = "";
  inputEnd.value = "";
  inputDate.value = "";
}

function buildApp() {
  bpast.innerHTML = "";
  btoday.innerHTML = "";
  bthisweek.innerHTML = "";
  bnextweeks.innerHTML = "";

  const filterText = inputSearch.value.toLowerCase();

  tasksConclude.forEach((task) => {
    if (task.task.toLowerCase().includes(filterText)) {
      bpast.appendChild(buildCard(task));
    }
  });

  tasksToday.forEach((task) => {
    if (task.task.toLowerCase().includes(filterText)) {
      btoday.appendChild(buildCard(task));
    }
  });

  tasksThisWeek.forEach((task) => {
    if (task.task.toLowerCase().includes(filterText)) {
      bthisweek.appendChild(buildCard(task));
    }
  });

  tasksNextWeeks.forEach((task) => {
    if (task.task.toLowerCase().includes(filterText)) {
      bnextweeks.appendChild(buildCard(task));
    }
  });

  updateVisibility();
}

function updateVisibility() {
  tpast.style.display = bpast.childElementCount > 0 ? "block" : "none";
  ttoday.style.display = btoday.childElementCount > 0 ? "block" : "none";
  tthisweek.style.display = bthisweek.childElementCount > 0 ? "block" : "none";
  tnextweeks.style.display =
    bnextweeks.childElementCount > 0 ? "block" : "none";
}

function formatDate(paramDate) {
  const [year, month, day] = paramDate.split("-");
  return `${day}/${month}/${year}`;
}

function isTaskOverdue(task) {
  const taskEndDateTime = new Date(`${task.date}T${task.end}`);
  const now = new Date();
  return taskEndDateTime < now;
}

buildApp();
