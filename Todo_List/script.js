document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("to-do-input");
    const addTaskButton = document.getElementById("register-task");
    const todoList = document.getElementById("to-do-list");


    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(tasks);
    tasks.forEach(task => {
        renderTask(task);
    });

    addTaskButton.addEventListener('click',() => {
        const taskText = todoInput.value.trim();
        if(taskText === "") return;


        const newTask = {
            id : Date.now(),
            task : taskText,
            completed : false
        }
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
        console.log(tasks);
    });


    function saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTask(task){
        // console.log(task.task);
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if(task.completed) li.classList.add("completed");
        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON'){
                return ;
            }
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });
        li.innerHTML = `
            <span>${task.task}</span>
            <button class="delete-btn">Delete</button>`;
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                tasks = tasks.filter(t => t.id !== task.id);
                li.remove();
                saveTasks();
        });
        todoList.appendChild(li);
    }
});