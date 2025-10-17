const inputEl = document.getElementById("username");
const btnEl = document.getElementById("submit");
const listEl = document.getElementById("nameList");
const errorText = document.getElementById("errorMsg");

const addingName = () => {
  const nameText = inputEl.value.trim();
  if (nameText !== "") {
    errorText.textContent = "";
    const itemEl = document.createElement("li");
    const nameSpan = document.createElement("span");

    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    deleteBtn.type = "button";
    editBtn.type = "button";
    
    nameSpan.classList.add("name-text");
    nameSpan.textContent = nameText;
    
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    itemEl.appendChild(nameSpan);
    itemEl.appendChild(editBtn);
    itemEl.appendChild(deleteBtn);
    listEl.appendChild(itemEl);
    inputEl.value = "";
    inputEl.focus();
  } else {
    errorText.textContent = "You must enter a name";
    inputEl.focus();
    return;
  }
};
listEl.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
  } else if (e.target.closest(".delete-btn")) {
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) deleteBtn.closest("li").remove();
    return;
  } else if (e.target.closest(".edit-btn")) {
    const editBtn = e.target.closest(".edit-btn");
    if (editBtn.textContent === "Edit") {
   const editBtn = e.target.closest(".edit-btn");
      const li = editBtn.closest("li");
      const nameSpan = li.querySelector(".name-text");
      nameSpan.focus();
    } else {
      editBtn.textContent = "Edit";
    }
  }
});

btnEl.addEventListener("click", addingName);

inputEl.addEventListener("input", () => {
  if (inputEl.value.trim() !== "") {
    errorText.textContent = "";
  }
});

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addingName();
  }
});
