{
  const tasks = [

  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const resetInput = (newTask) => {
    newTask.value = "";
    newTask.focus();
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
            <li class="taskList__item">
            <button class="taskList__button taskList__button--done js-done">${task.done ? "&#10003;" : ""
        }</button>
        <span class=${task.done ? '"taskList__span taskList__span--done">' : '"">'
        }${task.content}</span>
            <button class="taskList__button taskList__button--delete js-remove">🗑️</button>
            </li>
            `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTask = document.querySelector(".js-newTask");
    const newTaskContent = newTask.value.trim();

    if (newTaskContent === "") {
      activateInput(newTask);
      return;
    }
    resetInput(newTask);
    addNewTask(newTaskContent);
    return;
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}