{
  let tasks = [];

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

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleDoneTask(index);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li
      class="taskList__item"
      >
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

    bindEvents();
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
}





































































































