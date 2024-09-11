const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValue = document.getElementById("inputValue");



const getTodoListFromLocal =() =>{
    return JSON.parse(localStorage.getItem("youtubeTudoList"));
};

const addTodoListLocalStorage =(localTOdoLists) =>{
return localStorage.setItem("youtubeTudoList", JSON.stringify(localTOdoLists))
};
let localTOdoLists = getTodoListFromLocal() || [];

//Adding Add to list dynamically
const addTodoDynamicElement = (currelem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("main_todo_div");
    divElement.innerHTML = `<li> ${currelem} </li> <button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(divElement);
};

const addTodoList = (e) =>{
    e.preventDefault();

    const todoListValue = inputValue.value.trim();
    inputValue.value ="";
    
    if(todoListValue !== "" &&  !localTOdoLists.includes(todoListValue)){

    localTOdoLists.push(todoListValue);
    localTOdoLists = [...new Set(localTOdoLists)];
    console.log(localTOdoLists);
    localStorage.setItem("youtubeTudoList", JSON.stringify(localTOdoLists));

    addTodoDynamicElement(todoListValue);
    }
};

const showTodoList = () =>{
    localTOdoLists.forEach(currelem => {
        addTodoDynamicElement(currelem);
    });
};

showTodoList();
// remove the data
const removeTodoElem = (e) =>{
    const todoToRemove = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    let parentElem =todoToRemove.parentElement;
    console.log(todoListContent);

    localTOdoLists = localTOdoLists.filter((curTo) =>{
        return curTo !== todoListContent.toLowerCase();
    });

    addTodoListLocalStorage(localTOdoLists);
    parentElem.remove();
    
};
mainTodoElem.addEventListener("click", (e) =>{
    e.preventDefault();
    console.log(e.target.classList.contains("deleteBtn"));
    if(e.target.classList.contains("deleteBtn")){
        removeTodoElem(e);
        }
});

document.querySelector(".btn").addEventListener("click", (e) =>{
    
    addTodoList(e);
});
