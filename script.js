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
  const li = e.target.closest("li");
  if (!li) return;

  // Delete
  if (e.target.closest(".delete-btn")) {
    li.remove();
    return;
  }

  // Edit/Save
  const editBtn = e.target.closest(".edit-btn");
  if (editBtn) {
    const nameSpan = li.querySelector(".name-text");
    const input = li.querySelector("input");

    if (editBtn.textContent === "Edit") {
      // ENTER EDIT MODE
      const editInputField = document.createElement("input");
      editInputField.type = "text";
      editInputField.value = nameSpan.textContent;
      nameSpan.replaceWith(editInputField);
      editBtn.textContent = "Save";
      editInputField.focus();
      return;
    } else {
      // SAVE MODE
      const newText = input.value.trim();
      const updatedNameSpan = document.createElement("span");
      updatedNameSpan.classList.add("name-text");
      updatedNameSpan.textContent = newText;
      input.replaceWith(updatedNameSpan);
      editBtn.textContent = "Edit";
      return;
    }
  }

  // Toggle done on bare <li> clicks
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
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
  };
});
