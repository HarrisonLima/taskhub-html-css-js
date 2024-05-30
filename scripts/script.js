const inputDescription = document.getElementById("input-description");
const inputStart = document.getElementById("input-start");
const inputEnd = document.getElementById("input-end");
const inputDate = document.getElementById("input-date");

const modal = document.getElementById("modal");

const buttonCancel = document.getElementById("button-cancel");
const buttonConfirm = document.getElementById("button-confirm");
const buttonNewTask = document.getElementById("button-new-task");

buttonNewTask.addEventListener("click", (event) => {
  event.preventDefault();
  modal.setAttribute("view", "true");
});

buttonCancel.addEventListener("click", (event) => {
  event.preventDefault();
  modal.setAttribute("view", "false");
});

buttonConfirm.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(
    inputDescription.value,
    inputStart.value,
    inputEnd.value,
    inputDate.value
  );
});
