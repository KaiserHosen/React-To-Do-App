
document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = document.getElementById("dueDate").value;
    if (taskText === "") return;

    const li = createTaskElement(taskText, taskDate, false);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
    document.getElementById("dueDate").value = "";
}

function createTaskElement(text, taskDate,completed) {
    const li = document.createElement("li");
    li.classList.toggle("completed", completed);
    
    li.innerHTML = `
        <span class="task-text">${text}</span>
        <span class="due-date">${taskDate ? `Due:${taskDate}` : ""}</span>
        <button class="delete">X</button>
    `;

    return li;
}

function handleTaskClick(e) {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
    } else {
        e.target.parentElement.classList.toggle("completed");
    }
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const taskText = li.querySelector(".task-text").innerText;  // Only save task text
        tasks.push({ text: taskText, completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        const li = createTaskElement(task.text, task.completed);
        taskList.appendChild(li);
    });
}
