let dueDate = dayjs("04-30-2026");
let remainingTime = 0;
const currentDate = dayjs();
const modal = document.querySelector("#myModal");
const closeBtn = document.querySelector(".close");
const dueDateElement = document.querySelector(".due-date");
const dueDaysElement = document.querySelector(".badge-time");
const title = document.querySelector(".task-title");
const desc = document.querySelector(".task-desc");
const modalTitle = document.querySelector("#modal-title");
const modalDesc = document.querySelector("#modal-desc");
const status = document.querySelector("#status");
const editForm = document.querySelector("#editTaskForm");
const statusSelect = document.querySelector("#task-status");
const checkboxElement = document.querySelector("#task-check");
const cancelButton = document.querySelector("#cancelBtn");
const priority = document.querySelector("[data-testid='test-todo-priority']");
const prioritySelect = document.querySelector("#priority");
const datePicker = document.querySelector("#due-date-picker");
const dueDateDaysInMonth = dueDate.daysInMonth();
const currentDateDaysInMonth = currentDate.daysInMonth();

document.addEventListener("DOMContentLoaded", () => {
  dueDateElement.innerHTML = dueDate.format("MMM D, YYYY");
  calcDueDays();
});

function calcDueDays() {
  const dueDateMonth = dueDate.month();
  const currentDateMonth = currentDate.month();
  const dueDayOfMonth = dueDate.date();
  const currentDayOfMonth = currentDate.date();

  if (dueDateMonth === currentDateMonth) {
    remainingTime = dueDayOfMonth - currentDayOfMonth;

    if (remainingTime === 1) {
      dueDaysElement.innerHTML = "Due tomorrow";
    } else if (remainingTime > 0) {
      dueDaysElement.innerHTML = `Due in ${remainingTime} days`;
    } else if (remainingTime < 0) {
      dueDaysElement.innerHTML = `overdue by ${Math.abs(remainingTime)} day(s)`;
    } else {
      dueDaysElement.innerHTML = "Due now!";
    }
  }

  if (dueDateMonth > currentDateMonth) {
    const remainingDaysInCurrentMonth =
      currentDateDaysInMonth - currentDayOfMonth;
    remainingTime = dueDayOfMonth + remainingDaysInCurrentMonth;

    dueDaysElement.innerHTML = `Due in ${remainingTime} days`;
  }

  if (dueDateMonth < currentDateMonth) {
    dueDaysElement.innerHTML = "Long overdue!";
  }
}

setInterval(() => {
  calcDueDays();
}, 60000);

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  modal.style.display = "none";
  priority.lastChild.textContent = prioritySelect.value;
  title.textContent = modalTitle.value;
  desc.textContent = modalDesc.value;
  dueDate = dayjs(datePicker.value); // Reset dueDate so it reflects users selection
  dueDateElement.textContent = dayjs(datePicker.value).format("MMM D, YYYY");
  priority.className = "badge ";

  if (statusSelect.value === "Done") {
    checkboxElement.checked = true;
    title.classList.add("completed");
    status.className = "badge badge-pending badge-done";
    status.lastChild.textContent = "Done";
    dueDaysElement.style.display = "none";
  }

  if (
    statusSelect.value === "In progress" ||
    statusSelect.value === "Pending"
  ) {
    if (checkboxElement.checked) {
      checkboxElement.checked = false;
      title.classList.remove("completed");
      dueDaysElement.style.display = "block";
    }

    status.className = `badge ${statusSelect.value === "Pending" ? "badge-pending" : "badge-inprogress"}`;
    status.lastChild.textContent = statusSelect.value;
  }

  switch (prioritySelect.value) {
    case "Low":
      priority.className += "badge-low";
      break;

    case "Medium":
      priority.className += "badge-medium";
      break;

    default:
      priority.className += "badge-high";
  }

  calcDueDays();
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

function handleDelete() {
  alert("Delete clicked");
}

function toggleDone(checkbox) {
  title.classList.toggle("completed", checkbox.checked);
  status.classList.toggle("badge-done", checkbox.checked);
  status.lastChild.textContent = checkbox.checked ? "Done" : "Pending";
  dueDaysElement.style.display = checkbox.checked ? "none" : "";
}

function padNum(num) {
  if (num < 10) {
    return `0${num}`;
  }

  return num;
}

function handleEdit() {
  modal.style.display = "flex";
  statusSelect.value = status.textContent.trim();
  modalTitle.value = title.textContent.trim();
  modalDesc.value = desc.textContent.trim();
  datePicker.value = `${dueDate.year()}-${padNum(dueDate.month() + 1)}-${padNum(dueDate.date())}`;
}
