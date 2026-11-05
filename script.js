document.addEventListener("DOMContentLoaded", function () {

    // LOGIN FORM
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            localStorage.setItem("dailyTasksUser", email);

            alert("Login successful!");
            window.location.href = "tasks.html";
        });
    }

    // REGISTER LINK
    const registerLink = document.getElementById("registerLink");

    if (registerLink) {
        registerLink.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Registration will be available soon.");
        });
    }

    // TASK MANAGEMENT
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const taskStats = document.getElementById("taskStats");

    let tasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

    function saveTasks() {
        localStorage.setItem("dailyTasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        if (!taskList) return;

        taskList.innerHTML = "";

        tasks.forEach(function (task) {
            const item = document.createElement("div");

            item.className = "task-item" + (task.completed ? " completed" : "");

            const info = document.createElement("div");
            info.className = "task-info";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", function () {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            const name = document.createElement("span");
            name.className = "task-name";
            name.textContent = task.name;

            const category = document.createElement("span");
            category.className = "task-category";
            category.textContent = task.category;

            info.appendChild(checkbox);
            info.appendChild(name);

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function () {
                tasks = tasks.filter(function (t) {
                    return t.id !== task.id;
                });

                saveTasks();
                renderTasks();
            });

            item.appendChild(info);
            item.appendChild(category);
            item.appendChild(deleteButton);

            taskList.appendChild(item);
        });

        const completed = tasks.filter(function (task) {
            return task.completed;
        }).length;

        if (taskStats) {
            taskStats.textContent =
                "Total Tasks: " + tasks.length +
                " | Completed: " + completed +
                " | Remaining: " + (tasks.length - completed);
        }
    }

    if (taskForm) {
        taskForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const taskInput = document.getElementById("taskInput");
            const taskCategory = document.getElementById("taskCategory");

            const name = taskInput.value.trim();

            if (!name) return;

            tasks.push({
                id: Date.now(),
                name: name,
                category: taskCategory.value,
                completed: false
            });

            saveTasks();
            renderTasks();

            taskForm.reset();
            taskInput.focus();
        });

        renderTasks();
    }
});
