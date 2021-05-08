{
  const tasks = [];


  const addNewTask = () => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (taskIndeks) => {
    tasks.splice(taskIndeks, 1);
    render();
  }

  const toggleTaskDone = (taskIndeks) => {
    tasks[taskIndeks].done = !tasks[taskIndeks].done;
    render();
  }

  const bindEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done")

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  
  
  const removeButtons = document.querySelectorAll(".js-remove");
  
  removeButtons.forEach((removeButton, index) => {
    removeButton.addEventListener("click", () => {
      removeTask(index);
    });
  });
  }

  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
            <li class="list__item${task.done ? "list__item--done" : "list__item--delete"}">
            <button class="list__button list__button--done js-doneButton">✔️</button>
           ${task.content}
              <button class="list__button list__button--delete js-remove">🗑️</button> 
            </li>
            `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents ();
  };

const onFormSubmit = (event) => {
  event.preventDefault();

  const newTaskContent = document.querySelector(".js-newTask").value.trim();

  if (newTaskContent === "") {
    return;
  }
  addNewTask(newTaskContent);
};

const init = () => {
  render();

  const form = document.querySelector(".js-form");

  form.addEventListener("submit", onFormSubmit);
};

init();
}