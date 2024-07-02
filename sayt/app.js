const newTaskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const itemsLeft = document.getElementById("items-left");
const allBtn = document.getElementById("all-btn");
const activeBtn = document.getElementById("active-btn");
const completedBtn = document.getElementById("completed-btn");
const clearCompleted = document.getElementById("clear-completed");

let tasks = [];

const renderTasks = (filter = "all") => {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `flex justify-between text-[18px] text-[#494C6B] items-center px-4 py-[20px] bg-white rounded-t border-b border-[#E3E4F1] 
       ${task.completed ? "line-through text-[#D1D2DA]" : ""}`;
    li.innerHTML = `
    
          <input type="checkbox" class="mr-[10px]" ${
            task.completed ? "checked" : ""
          } />
          <span class="flex-1 mx-2">${task.text}</span>
          <button class="text-gray-500">X</button>
        `;

    li.querySelector("input").addEventListener("click", () =>
      toggleTask(task.id)
    );
    li.querySelector("button").addEventListener("click", () =>
      removeTask(task.id)
    );
    taskList.prepend(li);
  });

  updateItemsLeft();
};

const addTask = (text) => {
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
  };
  tasks.push(newTask);
  renderTasks();
};

const toggleTask = (id) => {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
};

const removeTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
};

const updateItemsLeft = () => {
  const activeTasks = tasks.filter((task) => !task.completed).length;
  itemsLeft.textContent = `${activeTasks} items left`;
};

newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && newTaskInput.value.trim()) {
    addTask(newTaskInput.value.trim());
    newTaskInput.value = "";
  }
});

allBtn.addEventListener("click", () => {
  renderTasks("all");
  allBtn.classList.toggle("checked-btn");
  activeBtn.classList.remove("checked-btn");
  completedBtn.classList.remove("checked-btn");
});
activeBtn.addEventListener("click", () => {
  renderTasks("active");
  activeBtn.classList.toggle("checked-btn");
  completedBtn.classList.remove("checked-btn");
  allBtn.classList.remove("checked-btn");
});
completedBtn.addEventListener("click", () => {
  renderTasks("completed");
  completedBtn.classList.toggle("checked-btn");
  allBtn.classList.remove("checked-btn");
  activeBtn.classList.remove("checked-btn");
});
clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
});

renderTasks();
