let state = {
  title: "Design System Overhaul",
  desc: "Rebuild the component library from scratch — tokens, spacing, and dark mode support.",
  priority: "High",
  status: "In Progress",
  due: new Date(Date.now() + 86400000 * 2)
};

const card = document.getElementById("card");
const titleEl = document.getElementById("title");
const descEl = document.querySelector("[data-testid='test-todo-description']");
const dueEl = document.getElementById("dueDate");
const timeEl = document.getElementById("timeLeft");
const overdueEl = document.getElementById("overdue");

function applyPriority() {
  card.className = "";
  card.classList.add("priority-" + state.priority.toLowerCase());
  
  const p = document.getElementById("priorityText");
  p.className = "priority priority-" + state.priority.toLowerCase() + "-text";
  p.textContent = state.priority;
}

function render() {
  titleEl.textContent = state.title;
  descEl.textContent = state.desc;
  dueEl.textContent = "Due " + state.due.toDateString();
  document.getElementById("statusControl").value = state.status;
  
  applyPriority();
  
  if (state.status === "Done") {
    card.classList.add("done");
    timeEl.textContent = "Completed";
  } else {
    card.classList.remove("done");
  }
}

function updateTime() {
  if (state.status === "Done") return;
  
  const now = new Date();
  const diff = state.due - now;
  
  let text = "";
  const mins = Math.floor(Math.abs(diff) / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  
  if (diff < 0) {
    overdueEl.classList.remove("hidden");
    text = `Overdue by ${hrs}h`;
  } else {
    overdueEl.classList.add("hidden");
    
    if (mins < 60) text = `Due in ${mins}m`;
    else if (hrs < 24) text = `Due in ${hrs}h`;
    else if (days === 1) text = "Due tomorrow";
    else text = `Due in ${days} days`;
  }
  
  timeEl.textContent = text;
}

setInterval(updateTime, 60000);
updateTime();
render();

/* sync */
const checkbox = document.getElementById("doneToggle");
const statusControl = document.getElementById("statusControl");

checkbox.onchange = () => {
  state.status = checkbox.checked ? "Done" : "Pending";
  statusControl.value = state.status;
  render();
};

statusControl.onchange = () => {
  state.status = statusControl.value;
  checkbox.checked = state.status === "Done";
  render();
};

/* expand */
expandBtn.onclick = () => {
  const expanded = expandBtn.getAttribute("aria-expanded") === "true";
  expandBtn.setAttribute("aria-expanded", !expanded);
  expandBtn.textContent = expanded ? "Expand" : "Collapse";
  descWrap.classList.toggle("collapsed");
};

/* edit */
editBtn.onclick = () => {
  viewMode.classList.add("hidden");
  editForm.classList.remove("hidden");
  
  editTitle.value = state.title;
  editDesc.value = state.desc;
  editPriority.value = state.priority;
  editDate.value = state.due.toISOString().slice(0, 16);
};

saveBtn.onclick = () => {
  state.title = editTitle.value;
  state.desc = editDesc.value;
  state.priority = editPriority.value;
  state.due = new Date(editDate.value);
  
  editForm.classList.add("hidden");
  viewMode.classList.remove("hidden");
  render();
};

cancelBtn.onclick = () => {
  editForm.classList.add("hidden");
  viewMode.classList.remove("hidden");
};