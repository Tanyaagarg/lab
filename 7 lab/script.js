// Get elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// When "Add Task" is clicked
addTaskBtn.addEventListener("click", () => {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();

  // Make sure title is not empty
  if (!title) {
    alert("Please enter a task title.");
    return;
  }

  // Create task container
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  // Create title and description elements
  let titleEl = document.createElement("h3");
  titleEl.textContent = title;

  let descEl = document.createElement("p");
  descEl.textContent = description;

  // Create button container
  const btnContainer = document.createElement("div");
  btnContainer.className = "task-buttons";

  // Create buttons
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Mark as Completed";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  // Add functionality

  // ✅ Mark complete/incomplete
  completeBtn.addEventListener("click", () => {
    const isCompleted = titleEl.classList.toggle("completed");
    descEl.classList.toggle("completed");
    completeBtn.textContent = isCompleted ? "Mark as Incomplete" : "Mark as Completed";
  });

  // ❌ Delete task
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskDiv);
  });

  // ✏️ Edit/Save task
  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "Edit") {
      // Turn text into input fields
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = titleEl.textContent;

      const descInput = document.createElement("input");
      descInput.type = "text";
      descInput.value = descEl.textContent;

      taskDiv.replaceChild(titleInput, titleEl);
      taskDiv.replaceChild(descInput, descEl);

      // Update references
      titleEl = titleInput;
      descEl = descInput;

      editBtn.textContent = "Save";
    } else {
      // Save new values
      const newTitle = titleEl.value.trim();
      const newDesc = descEl.value.trim();

      const newTitleEl = document.createElement("h3");
      newTitleEl.textContent = newTitle || "Untitled Task";

      const newDescEl = document.createElement("p");
      newDescEl.textContent = newDesc;

      taskDiv.replaceChild(newTitleEl, titleEl);
      taskDiv.replaceChild(newDescEl, descEl);

      // Update references
      titleEl = newTitleEl;
      descEl = newDescEl;

      editBtn.textContent = "Edit";
    }
  });

  // Add buttons to container
  btnContainer.appendChild(completeBtn);
  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(deleteBtn);

  // Add everything to the task div
  taskDiv.appendChild(titleEl);
  taskDiv.appendChild(descEl);
  taskDiv.appendChild(btnContainer);

  // Add the task to the list
  taskList.appendChild(taskDiv);

  // Clear input fields
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
});
