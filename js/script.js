{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const removeTask = (taskIndex) => {

    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleDoneTask = (taskIndex) => {
    const task = tasks[taskIndex];

    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...task, done: !task.done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const setAllDoneTasks = () => {
    tasks = tasks.map(task => ({
      ...task,
      done: true,
    }))
    render();

  };

  const bindRemoveEvent = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleDoneEvent = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleDoneTask(index);
      });
    });
  };

  const bindHideDoneTasksEvent = () => {
    const buttonHideDoneTasks = document.querySelector(".js-hideDoneTasks");
    if (!buttonHideDoneTasks) {
      return;
    }
    buttonHideDoneTasks.addEventListener("click", () => {
      toggleHideDoneTasks();
    });
  };

  const bindSetAllDoneTasksEvent = () => {
    const buttonSetAllDoneTasks = document.querySelector(".js-setAllDoneTasks");
    if (!buttonSetAllDoneTasks) {
      return;
    }
    buttonSetAllDoneTasks.addEventListener("click", () => {
      setAllDoneTasks();
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li
      class="taskList__item${task.done && hideDoneTasks ? " taskList__item--hidden" : ""}">
        <button class="taskList__button taskList__button--done js-done">
      ${task.done ? "&#10003;" : ""}
        </button>
        <span class=${task.done ? "taskList__span--done" : ""}>
      ${task.content}</span>
        <button class="taskList__button taskList__button--delete js-remove">
        🗑
        </button>
      </li>
      `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;

  };
  const renderButtons = () => {
    let buttonsHtmlString = "";

    if (tasks.length > 0) {
      buttonsHtmlString += `
             <button class="section__buttons js-hideDoneTasks">
           ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
             </button>
             <button class="section__buttons js-setAllDoneTasks"
           ${tasks.every(({ done }) => done) ? "disabled" : ""}> 
              Ukończ wszystkie
             </button>
              `;
    }
    document.querySelector(".js-buttons").innerHTML = buttonsHtmlString;
  }

  const render = () => {
    renderTasks();
    renderButtons();
    bindRemoveEvent();
    bindToggleDoneEvent();
    bindHideDoneTasksEvent();
    bindSetAllDoneTasksEvent();
  };


  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTask = document.querySelector(".js-newTask");
    const newTaskContent = newTask.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTask.value = "";
    }
    newTask.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
};