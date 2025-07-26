let tasks = [];

document.getElementById("todo-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const task = document.getElementById("task").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const category = document.getElementById("category").value.trim();

  if (task === "") return;

  const newTask = {
    id: Date.now(),
    task,
    date,
    time,
    category,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();
  this.reset();
});

function renderTasks(filter = "all") {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(t => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  filteredTasks.forEach(t => {
    const li = document.createElement("li");

    const header = document.createElement("div");
    header.className = "task-header";

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = t.task;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = t.completed;
    checkbox.addEventListener("change", () => {
      t.completed = !t.completed;
      renderTasks(filter);
    });

    header.appendChild(checkbox);
    header.appendChild(title);
    li.appendChild(header);

    const details = document.createElement("div");
    details.innerHTML = `
      <small><strong>Date:</strong> ${t.date || "-"} | 
      <strong>Time:</strong> ${t.time || "-"} | 
      <strong>Category:</strong> ${t.category || "-"}</small>
    `;
    li.appendChild(details);

    const actions = document.createElement("div");
    actions.className = "actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks = tasks.filter(task => task.id !== t.id);
      renderTasks(filter);
    };

    actions.appendChild(deleteBtn);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

function filterTasks(type) {
  renderTasks(type);
}
