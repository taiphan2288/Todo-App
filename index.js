const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField .addBtn");
const todoList = document.querySelector(".todoList");
const penddingTask = document.querySelector(".footer .pendingTask");
const clearAllBtn = document.querySelector(".footer button");
const saveBtn = document.querySelector(".inputField .saveBtn");

inputBox.onkeyup = () => {
  // get value of user
  let userEnteredValue = inputBox.value;
  // the values aren't space
  if (userEnteredValue.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

showList();

// click add button
addBtn.addEventListener("click", () => {
  let userEnterValue = inputBox.value;
  let getLocalStorage = localStorage.getItem("Newtodo");
  //   check local storage
  if (!getLocalStorage) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }

  //   Check input value for input field
  if (userEnterValue == 0) {
    alert("Please, Fill out your task!!!");
    return;
  }
  listArray.push(userEnterValue);
  console.log(listArray);
  localStorage.setItem("Newtodo", JSON.stringify(listArray));

  showList();
});

// Saving after editting task
saveBtn.addEventListener("click", function () {
  let userEnterValue = inputBox.value;
  let getLocalStorage = localStorage.getItem("Newtodo");
  //   check local storage
  if (!getLocalStorage) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }
  let taskId = this.getAttribute("id");
  // alert(taskId);
  if (taskId == 0 || taskId) {
    listArray[taskId] = userEnterValue; // Override value
  }
  console.log(listArray);
  localStorage.setItem("Newtodo", JSON.stringify(listArray));
  showList();
});

// click delete button
clearAllBtn.onclick = deleteAll;

// show list item
function showList() {
  let getLocalStorage = localStorage.getItem("Newtodo");
  //   check local storage
  if (!getLocalStorage) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }
  newTask = "";
  listArray.forEach((item, index) => {
    newTask += `<ul class="todoListItem">
                  <li>
                    <div class="itemContent">
                      ${item} 
                    </div>                 
                    <div class="edit">
                      <div onclick="editTask(${index})" class="editContent">
                        <i class="uil uil-edit"></i>
                      </div>
                      <span onclick="deleteTask(${index})" class="deleteTask">
                        <i class="uil uil-trash"></i>
                      </span>
                    </div>
                  </li>
                </ul>`;
  });
  todoList.innerHTML = newTask;
  inputBox.value = "";
  penddingTask.innerHTML = listArray.length;
}

// Delete all list item
function deleteAll() {
  listArray = [];
  localStorage.setItem("Newtodo", JSON.stringify(listArray));
  showList();
}

// Delete task
function deleteTask(index) {
  if (confirm("Are you sure, you want to delete this task?")) {
    listArray.splice(index, 1);
    localStorage.setItem("Newtodo", JSON.stringify(listArray));
    showList();
  }
}

// Edit task
function editTask(index) {
  let getLocalStorage = localStorage.getItem("Newtodo");
  //   check local storage
  if (!getLocalStorage) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }

  if (listArray.length > 0) {
    let userEnterValue = inputBox.value;
    // console.log(listArray[index]);
    inputBox.value = listArray[index];
    saveBtn.setAttribute("id", index); // set attribute for button of editting task
  }
}
