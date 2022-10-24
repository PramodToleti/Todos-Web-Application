let userInputEl = document.getElementById("userInput");
let createBtnEl = document.getElementById("createTodoBtn");
let userNameEl = document.getElementById("name");
let todoHeadingEl = document.getElementById("todoHeading");
let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let taskHeadingEl = document.getElementById("taskheading");
let myTaskHeadingel = document.getElementById("myTaskHeading");
let todosContainerEl = document.getElementById("todosContainer");
let userPageEl = document.getElementById("sectionUser");
let subtaskContainerEl = document.getElementById("subtaskContainer");


let counter = 0;
let user = {
    userName: ""
};

userInputEl.addEventListener('keyup', function(event) {
    user.userName = event.target.value;
    if (user.userName !== "") {
        createBtnEl.setAttribute("onclick", "display('sectionTodo')");
    }
});


function createTodo() {
    if (user.userName === "") {
        alert("Enter your name");
    } else {
        userNameEl.textContent = user.userName;
        userPageEl.remove();
        console.log(document.documentElement);
    }
}

createBtnEl.addEventListener('click', createTodo);

function changetaskColor() {
    let timeId = setInterval(function() {
        myTaskHeadingel.classList.add("task-heading-color");
        todoHeadingEl.classList.add("task-heading-color");
        counter = counter + 1;
        if (counter === 2) {
            myTaskHeadingel.classList.remove("task-heading-color");
            todoHeadingEl.classList.remove("task-heading-color");
            clearInterval(timeId);
            counter = 0;
        }
    }, 800);
}
saveTodoButton.addEventListener('click', changetaskColor);

function changeColor() {
    let timeId = setInterval(function() {
        taskHeadingEl.classList.add("task-heading-color");
        todoHeadingEl.classList.add("task-heading-color");
        counter = counter + 1;
        if (counter === 2) {
            taskHeadingEl.classList.remove("task-heading-color");
            todoHeadingEl.classList.remove("task-heading-color");
            clearInterval(timeId);
            counter = 0;
        }
    }, 800);
}
addTodoButton.addEventListener('click', changeColor);


function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};


function onTodoStatusChange(checkboxId, labelId, todoId, labelContainer) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    labelContainer.classList.toggle("label-container-color");


    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;


    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId, labelContainer);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
        labelContainer.classList.add("label-container-color");
        subtaskContainerEl.remove();
    } else {
        labelElement.classList.remove("checked");
        labelContainer.classList.remove("label-container-color");
        subtaskContainerEl.remove();
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}


function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    subtaskContainerEl.remove();
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};


function onDeleteTodo(todoId) {
    let timeId = setInterval(function() {
        counter = counter + 1;
        myTaskHeadingel.classList.add("task-heading-remove-color");
        todoHeadingEl.classList.add("task-heading-remove-color");
        if (counter === 2) {
            myTaskHeadingel.classList.remove("task-heading-remove-color");
            todoHeadingEl.classList.remove("task-heading-remove-color");
            counter = 0;
            clearInterval(timeId);
        }
    }, 800);

    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}


for (let todo of todoList) {
    createAndAppendTodo(todo);
}