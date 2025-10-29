const inputEl = document.getElementById("input");
const btnEl = document.getElementById("submit");
const errorEl = document.getElementById("errorMsg");
const nameListEl = document.getElementById("nameList");
const STORAGE_KEY = "nameList";

const addName = () => {
    const nameInputText = inputEl.value.trim();
    if (nameInputText === "") {
        errorEl.textContent = "You must enter a name";
        inputEl.focus();
        return;
    } else {
        errorEl.textContent = "";
        const liEl = document.createElement("li");
        const delBtn = document.createElement("button");
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        delBtn.classList.add("delete-btn");
        delBtn.textContent = "X";
        const spanEl = document.createElement("span");
        spanEl.classList.add("name-text");
        spanEl.textContent = nameInputText;
        liEl.appendChild(spanEl);
        liEl.appendChild(editBtn);
        liEl.appendChild(delBtn);
        nameListEl.appendChild(liEl);
        saveNames();
        inputEl.value = "";
        inputEl.focus();
    }
};
function saveNames () {
  const nameSpans = document.querySelectorAll(".name-text");
  const names = [];
  for (const span of nameSpans) {
  names.push(span.textContent);
}
  const stringNames = JSON.stringify(names);
    localStorage.setItem(STORAGE_KEY, stringNames);
};

function loadNames () {
 let keyNames = localStorage.getItem(STORAGE_KEY);
  if (!keyNames) {
    keyNames = [];
  } else {
    keyNames = JSON.parse(keyNames);
    for (const name of keyNames) {
      inputEl.value = name;
      addName();
      inputEl.value = "";
    }
  }
};

btnEl.addEventListener("click", addName);

inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addName();
    }
});

const delEditSave = (e) => {
    if (e.target.matches(".delete-btn")) {
        const liEl = e.target.closest("li");
        liEl.remove();
        inputEl.focus();
    } else if (e.target.matches(".edit-btn") && e.target.textContent === "Edit") {
        const liEl = e.target.closest("li");
        const spanEl = liEl.querySelector(".name-text");
        const editBtnEl = liEl.querySelector(".edit-btn");
        const newInputEl = document.createElement("input"); 
        newInputEl.value = spanEl.textContent;
        liEl.dataset.original = spanEl.textContent;
        spanEl.replaceWith(newInputEl);
        editBtnEl.textContent = "Save";
        errorEl.textContent = "";
        newInputEl.focus();

    } else if (e.target.matches(".edit-btn") && e.target.textContent === "Save") {
        const liEl = e.target.closest("li");
        const newInput = liEl.querySelector("input");
        const saveBtnEl = liEl.querySelector(".edit-btn");
        if (newInput.value.trim() === "") {
            errorEl.textContent = "You must enter a name";
            newInput.focus();
        } else {
            const newSpanEl = document.createElement("span");
            newSpanEl.classList.add("name-text");
            newSpanEl.textContent = newInput.value.trim();
            newInput.replaceWith(newSpanEl);
            liEl.dataset.original = newSpanEl.textContent;
            saveBtnEl.textContent = "Edit";
            errorEl.textContent = "";
            inputEl.focus();
        }

    }
}
nameListEl.addEventListener("click", delEditSave);

nameListEl.addEventListener("keydown", function (e) {
if (e.key !== "Enter"){
        return;
    } if (!e.target.matches("input")){
        return;
    }
    else {
        const liEl = e.target.closest("li");
        const newInput = liEl.querySelector("input");
        const saveBtnEl = liEl.querySelector(".edit-btn");
        if (newInput) {
            saveBtnEl.click();
        }
        e.preventDefault();
    }
});

nameListEl.addEventListener("keydown", function(e) {
    if (e.key !== "Escape"){
        return;
    } if (!e.target.matches("input")){
        return;
    } else {
        const liEl = e.target.closest("li");
        const input = liEl.querySelector("input");
        const btn = liEl.querySelector(".edit-btn");
        const storedDataText = liEl.dataset.original;
        const spanEl = document.createElement("span");
        spanEl.classList.add("name-text");
        spanEl.textContent = storedDataText;
        input.replaceWith(spanEl);
        btn.textContent = "Edit";
        errorEl.textContent = "";
        inputEl.focus();
        e.preventDefault();
    }
});

loadNames();
