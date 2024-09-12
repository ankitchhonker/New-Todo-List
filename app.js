 const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValue = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("youtubeTudoList")) || [];
};

const addTodoListLocalStorage = (localTodoLists) => {
    localStorage.setItem("youtubeTudoList", JSON.stringify(localTodoLists));
};

let localTodoLists = getTodoListFromLocal();

const addTodoDynamicElement = (todoText) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = `<li> ${todoText} </li> <button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(divElement);
};

const addTodoList = (e) => {
    e.preventDefault();

    const todoListValue = inputValue.value.trim();
    inputValue.value = "";

    if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
        localTodoLists.push(todoListValue);
        addTodoListLocalStorage(localTodoLists);

        addTodoDynamicElement(todoListValue);
    }
};

const showTodoList = () => {
    localTodoLists.forEach((todo) => {
        addTodoDynamicElement(todo);
    });
};

showTodoList();

const removeTodoElem = (e) => {
    const deleteButton = e.target;
    const todoContent = deleteButton.previousElementSibling.innerText;
    const parentElement = deleteButton.parentElement;

    localTodoLists = localTodoLists.filter((todo) => todo !== todoContent);
    addTodoListLocalStorage(localTodoLists);

    parentElement.remove();
};

mainTodoElem.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        removeTodoElem(e);
    }
});

document.getElementById("todoForm").addEventListener("submit", (e) => {
    addTodoList(e);
});
