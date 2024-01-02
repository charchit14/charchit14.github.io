import './sass/main.scss';
import Task from './Task';
import TaskList, { Filters } from './TaskList';

// Get DOM Elements
// Modals
const modal = document.querySelector('#modal') as HTMLDivElement;
const modalOpener = document.querySelectorAll('.modal-opener');
const modalCloser = document.querySelectorAll('.modal-closer');
const taskForm = document.querySelector(
  '#add-task',
) as HTMLFormElement;
const modalTaskForm = document.querySelector(
  '#modal-add-form',
) as HTMLFormElement;

const searchInput = document.querySelector(
  '#search',
) as HTMLInputElement;

// Filter btns
const allFilterBtns = document.querySelectorAll('.filter-all');
const completeFilterBtns = document.querySelectorAll(
  '.filter-complete',
);
const incompleteFilterBtns = document.querySelectorAll(
  '.filter-incomplete',
);

// Intitialize variables
const taskList = new TaskList([], Filters.ALL);

/**
 * create a new task instance and
 * add it to the taskList
 *
 * @param title title of the task
 * @param description description of the task
 * @param completed status of the task
 * @returns task object
 */
function createTask(
  title: string,
  description: string,
  completed: boolean,
) {
  const task = new Task(title, description, completed);
  taskList.addTask(task);
  return task;
}

/**
 * handle when task is submitted through form
 *
 * @param event form submit event
 */
function handleTaskSubmit(event: SubmitEvent) {
  event.preventDefault();

  const taskForm = event.target as HTMLFormElement;
  const formData = new FormData(taskForm);

  // Grab form value
  const title = formData.get('title') as string;
  const description = (formData.get('description') as string) || '';
  const completed = false;

  // create task and render it on the page
  createTask(title, description, completed);

  taskList.render();
  // reset the form
  taskForm.reset();
  handleModalClose();
}

/**
 * Handle filter button click
 *
 * @param filter The selected filter
 */
function handleFilterClick(currentFilter: Filters) {
  // Remove active class from the buttons
  allFilterBtns.forEach((btn) => {
    btn.classList.remove('header__menu-link--active');
  });

  completeFilterBtns.forEach((btn) => {
    btn.classList.remove('header__menu-link--active');
  });

  incompleteFilterBtns.forEach((btn) => {
    btn.classList.remove('header__menu-link--active');
  });

  taskList.setFilter(currentFilter);
  taskList.render();
}

/**
 * open the modal
 *
 */
function handleModalOpen() {
  if (!modal) throw new Error('No modal found');
  modal.classList.remove('modal-hidden');
}

/**
 * close the modal
 *
 */
function handleModalClose() {
  if (!modal) throw new Error('No modal found');
  modal.classList.add('modal-hidden');
  modalTaskForm.reset();
}

/**
 * setup the event listeners in our app
 *
 */
function setupEventListeners() {
  // Handle task event listeners

  [taskForm, modalTaskForm].forEach((tasks) => {
    tasks?.addEventListener('submit', handleTaskSubmit);
  });

  // Handle when modal opens
  modalOpener.forEach((opener) => {
    opener.addEventListener('click', handleModalOpen);
  });

  // Handle when modal closes
  modalCloser.forEach((closer) => {
    closer.addEventListener('click', handleModalClose);
  });

  // handle when filter button is clicked
  allFilterBtns.forEach((allFilterBtn) => {
    allFilterBtn.addEventListener('click', () => {
      handleFilterClick(Filters.ALL);
      allFilterBtn.classList.add('header__menu-link--active');
    });
  });

  completeFilterBtns.forEach((completeFilterBtn) => {
    completeFilterBtn.addEventListener('click', () => {
      handleFilterClick(Filters.COMPLETE);
      completeFilterBtn.classList.add('header__menu-link--active');
    });
  });

  incompleteFilterBtns.forEach((incompleteFilterBtn) => {
    incompleteFilterBtn.addEventListener('click', () => {
      handleFilterClick(Filters.INCOMPLETE);
      incompleteFilterBtn.classList.add('header__menu-link--active');
    });
  });

  // Handle when user searches
  searchInput.addEventListener('input', () => {
    taskList.setQuery(searchInput.value);
    taskList.setFilter(Filters.SEARCH);
    taskList.render();
  });
}

// Call functions
taskList.render();
setupEventListeners();
