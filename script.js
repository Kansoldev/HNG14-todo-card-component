const currentDate = new Date();
const dueDate = new Date("Tue April 28 2026 15:30:00");
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
const priority = document.querySelector("[data-testid='test-todo-priority']");
const prioritySelect = document.querySelector("#priority");
const remainingTime = dueDate.getUTCDate() - currentDate.getUTCDate();

document.addEventListener("DOMContentLoaded", () => {
  const formattedDueDate = dueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  dueDateElement.innerHTML = formattedDueDate;
  calcDueDays();
});

setInterval(() => {
  calcDueDays();
}, 60000);

function calcDueDays() {
  if (remainingTime === 1) {
    dueDaysElement.innerHTML = "Due tomorrow";
  } else if (remainingTime > 0) {
    dueDaysElement.innerHTML = `Due in ${remainingTime} days`;
  } else {
    dueDaysElement.innerHTML = "Due now!";
  }
}

function toggleDone(checkbox) {
  title.classList.toggle("completed", checkbox.checked);
  status.classList.toggle("badge-done", checkbox.checked);
  status.lastChild.textContent = checkbox.checked ? "Done" : "Pending";
  dueDaysElement.style.display = checkbox.checked ? "none" : "";
}

function handleEdit() {
  modal.style.display = "flex";
  statusSelect.value = status.textContent.trim();
  modalTitle.value = title.textContent.trim();
  modalDesc.value = desc.textContent.trim();
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  modal.style.display = "none";
  priority.lastChild.textContent = prioritySelect.value;
  title.textContent = modalTitle.value;
  desc.textContent = modalDesc.value;
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
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

function handleDelete() {
  alert("Delete clicked");
}
