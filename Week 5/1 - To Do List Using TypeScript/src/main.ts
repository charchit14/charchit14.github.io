document.addEventListener('DOMContentLoaded', function () {
    const inputBox: HTMLInputElement = document.getElementById("input-box") as HTMLInputElement;
    const listContainer: HTMLElement = document.getElementById("list-container")!;

    createTask();   //createTask is invoked when the DOM content is loaded


    function createTask(): void {
        if (inputBox.value === '') {
            alert("Write something to create a task");
            return;
        }

        const li: HTMLLIElement = document.createElement("li");
        li.textContent = inputBox.value;

        const span: HTMLSpanElement = document.createElement("span");
        span.textContent = "Delete";
        li.appendChild(span);
        listContainer.appendChild(li);

        inputBox.value = '';
        saveData();
    }

    function deleteTask(target: HTMLElement): void {
        if (target.tagName === "SPAN") {
            target.parentElement?.remove();
            saveData();
        }
    }

    listContainer.addEventListener("click", function (e: Event) {
        const target = e.target as HTMLElement;

        if (target.tagName === "LI") {
            target.classList.toggle("checked");
            saveData();
        } else {
            deleteTask(target);
        }
    });

    function saveData(): void {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    function showData(): void {
        listContainer.innerHTML = localStorage.getItem("data") || '';
    }
    showData();

    // Rest of your code remains the same
    function showCompletedTasks(): void {
        const tasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li");

        tasks.forEach(task => {
            task.style.display = "none";
        });

        const completedTasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li.checked");

        completedTasks.forEach(task => {
            task.style.display = "block";
        });

        highlightButton('completed');
    }

    function showAllTasks(): void {
        const tasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li");

        tasks.forEach(task => {
            task.style.display = "block";
        });

        highlightButton('home');
    }

    function showRemainingTasks(): void {
        const tasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li");

        tasks.forEach(task => {
            task.style.display = "none";
        });

        const remainingTasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li:not(.checked)");

        remainingTasks.forEach(task => {
            task.style.display = "block";
        });

        highlightButton('remaining');
    }

    function highlightButton(buttonId: string): void {
        const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".pages button");

        buttons.forEach(button => {
            if (button.id === buttonId) {
                button.style.backgroundColor = "yellow";
            } else {
                button.style.backgroundColor = "";
            }
        });
    }

    function setDefaultSelection(): void {
        showAllTasks();
    }

    setDefaultSelection();

    // const completedButton: HTMLElement | null = document.getElementById("completed");
    // const homeButton: HTMLElement | null = document.getElementById("home");
    // const remainingButton: HTMLElement | null = document.getElementById("remaining");

    // if (completedButton && homeButton && remainingButton) {
    //     completedButton.addEventListener("click", showCompletedTasks);
    //     homeButton.addEventListener("click", showAllTasks);
    //     remainingButton.addEventListener("click", showRemainingTasks);
    // }




    function attachButtonListeners(): void {
        const completedButton: HTMLElement | null = document.getElementById("completed");
        const homeButton: HTMLElement | null = document.getElementById("home");
        const remainingButton: HTMLElement | null = document.getElementById("remaining");

        if (completedButton && homeButton && remainingButton) {
            completedButton.addEventListener("click", showCompletedTasks);
            homeButton.addEventListener("click", showAllTasks);
            remainingButton.addEventListener("click", showRemainingTasks);
        }
    }

    attachButtonListeners();



});
