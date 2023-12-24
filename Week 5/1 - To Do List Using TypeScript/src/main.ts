// Creating the variables
const inputBox: HTMLInputElement | null = document.getElementById("input-box") as HTMLInputElement;
const listContainer: HTMLElement | null = document.getElementById("list-container");

// Checking if inputBox and listContainer are not null before using them
if (inputBox && listContainer) {
// For the creation of task
  function createTask(): void {
      if(inputBox.value === ''){
          alert("Write something to create a task");
      }
      else {
          const li: HTMLLIElement = document.createElement("li");
          li.innerHTML = inputBox.value;
          if (listContainer) {
              listContainer.appendChild(li);
          }

          // Adding a cross-icon at the end of the task
          const span: HTMLSpanElement = document.createElement("span");
          span.textContent = "Delete"; // To delete the task
          li.appendChild(span);
      }
      inputBox.value = ''; // To clear the input field
      saveData(); // Calling the function to save data each time a new task is added
  }


  // For the click function ('e' means event)
  if (listContainer) {
      listContainer.addEventListener("click", function(e: Event){
          const target = e.target as HTMLElement;
          if(target.tagName === "LI"){  // Checks if clicked on 'LI'
              target.classList.toggle("checked");  // Adds the 'checked' class name in CSS and adds it but if it already exists then it is removed
              saveData();
          }
          // Delete the parent element if clicked on span
          else if(target.tagName === "SPAN"){
              target.parentElement?.remove();
              saveData();
          }
      }, false);
  }

  // To save the state of the tasks even if the page is refreshed
  function saveData(): void {
      if (listContainer) {
          localStorage.setItem("data", listContainer.innerHTML);
      }
  }

  // To display the last saved data when we re-open the browser
  function showData(): void {
      if (listContainer) {
          listContainer.innerHTML = localStorage.getItem("data") || '';
      }
  }
  showData();


  // Functionality to filter out the tasks based on buttons

  // Creating the variables
  const completedButton: HTMLElement | null = document.getElementById("completed");
  const homeButton: HTMLElement | null = document.getElementById("home");
  const remainingButton: HTMLElement | null = document.getElementById("remaining");

  // To display only the checked tasks and change the color of 'Completed Tasks' button
  function showCompletedTasks(): void {
      const checkedTasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li.checked");
      const allTasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li");

      allTasks.forEach(task => {
          task.style.display = "none";
      });

      checkedTasks.forEach(task => {
          task.style.display = "block";
      });

      if (completedButton) {
          completedButton.style.backgroundColor = "yellow";
      }
      if (homeButton) {
          homeButton.style.backgroundColor = "";
      }
      if (remainingButton) {
          remainingButton.style.backgroundColor = "";
      }
  }

  // To display all the listed tasks and change the color of 'Home' button
  function showAllTasks(): void {
      const allTasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li");
      
      allTasks.forEach(task => {
          task.style.display = "block";
      });

      if (completedButton) {
          completedButton.style.backgroundColor = "";
      }
      if (homeButton) {
          homeButton.style.backgroundColor = "yellow";
      }
      if (remainingButton) {
          remainingButton.style.backgroundColor = "";
      }
  }

  // To display the remaining tasks and change the color of 'Remaining Tasks' button
  function showRemainingTasks(): void {
      const uncheckedTasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li:not(.checked)");
      const allTasks: NodeListOf<HTMLLIElement> = document.querySelectorAll("li");

      allTasks.forEach(task => {
          task.style.display = "none";
      });

      uncheckedTasks.forEach(task => {
          task.style.display = "block";
      });

      if (completedButton) {
          completedButton.style.backgroundColor = "";
      }
      if (homeButton) {
          homeButton.style.backgroundColor = "";
      }
      if (remainingButton) {
          remainingButton.style.backgroundColor = "yellow";
      }
  }

  if (completedButton) {
      completedButton.addEventListener("click", function() {
          showCompletedTasks();
      });
  }

  if (homeButton) {
      homeButton.addEventListener("click", function() {
          showAllTasks();
          if (homeButton) {
              homeButton.style.backgroundColor = "yellow";
          }
      });
  }

  if (remainingButton) {
      remainingButton.addEventListener("click", function() {
          showRemainingTasks();
      });
  }

  // Setting the default selection to Home button when the page loads (waits for the page to load ("load" event))
  window.addEventListener("load", function() {
      showAllTasks();
      if (homeButton) {
          homeButton.style.backgroundColor = "yellow";
      }
  });
}
else {
  console.error("Input Box or List Container not found");
}