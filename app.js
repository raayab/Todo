const list = document.getElementById("list");
input = document.getElementById("input");
OkButton = document.getElementById("OkButton");
const LINE_THROUGH = "done";
let items = [];
let id = 0;

//Get items from localStorage
let data = localStorage.getItem("items");
if (data) {
    items = JSON.parse(data);
    id = items.length;
    loadItems(items);
} else {
    items = [];
    id = 0;
}

//Load items from the localStorage to the user list
function loadItems(items) {
    items.forEach(item => {
        addItemToList(item.name, item.id, item.done, item.deleted);
    });
}
//Add new item to the list
function addItemToList(toDo,id,isDone,deleted) {

    if (deleted) {return; }
    const done = isDone ? LINE_THROUGH : "";
    const item = `
            <li class="item">
                <p class="text ${done}" id="${id}" >${toDo}</p>
                <div>
                    <button class="doneButton" job="done" id="${id}">done!</button>
                    <button class="deleteButton" job="delete" id="${id}">delete</button>
                </div>
            </li>
                 `;
    const position = "beforeend";
    list.insertAdjacentHTML(position,item); 
}
//Mark the task as done with line-through
function completeToDo(element) {
    element.parentNode.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    items[element.id].done =  items[element.id].done ? false : true;
}
//Delete the task from the list
function deleteToDo(element) {
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
    items[element.id].deleted = true;
}
//add input to the storage and list
function addInput() {
    addItemToList(input.value,id,false,false);
    items.push({
         name: input.value,
         id : id,
         done : false,
         deleted : false
    });
    localStorage.setItem("items",JSON.stringify(items));
    id++;
    input.value = "";
}
//add new item after the user press Enter
function onInputChange(event) {    
    //if the user presses "enter" after the input
    if (input.value.length > 0 && (event.which == 13 || event.keyCode == 13))
       if (input.value) {
        addInput();
       }
        
}
//add new item after the user press the "Add" button
function onAddButtonPressed() {
    if (input.value.length > 0) {
        addInput();
    }        
}

OkButton.addEventListener("click",onAddButtonPressed);
input.addEventListener("keypress",onInputChange);
list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "delete") {
        deleteToDo(element);
        localStorage.setItem("items",JSON.stringify(items));
    } else if (elementJob == "done") {
        completeToDo(element);
        localStorage.setItem("items",JSON.stringify(items));
    }
    
})
