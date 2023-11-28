// Creating the variables
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


// For the creation of task
function createTask() {
    if(inputBox.value === ''){
        alert("Write something to create a task");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Adding a cross-icon at the end of the task
        let span = document.createElement("span");
        span.textContent = "Delete"; // To delete the task
        li.appendChild(span);
    }
    inputBox.value = '' // To clear the input field
    saveData(); //Calling the function to save data each time a new task is added
}


// For the click function ('e' means event)
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){  //Checks if clicked on 'LI'
        e.target.classList.toggle("checked");  // Adds the 'checked' class name in CSS and adds it but if it already exists then it is removed
        saveData();
    }
    // Delete the parent element if clicked on span
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);


// To save the state of the tasks even if the page is refreshed
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}


//To display the last saved data when we re-open the browser
function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();