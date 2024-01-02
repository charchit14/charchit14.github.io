import { ITask } from './Task';
import { createImage } from './utils';
import listSvg from './assets/icons/list.svg';
import circleOutline from './assets/icons/circle-outline.svg';
import circleComplete from './assets/icons/complete.svg';

export enum Filters {
  ALL,
  COMPLETE,
  INCOMPLETE,
  SEARCH,
}

interface ITaskList {
  list: ITask[];
  filter: Filters;
  getTaskById: (id: string) => ITask | null;
  getTaskByIndex: (index: number) => ITask | null;
  addTask: (task: ITask) => ITask[];
  getTasks: () => ITask[];

  renderEmptyList: () => void;
  render: () => void;
}

// Get the task list container
const taskListElement = document.querySelector(
  '.tasks',
) as HTMLDivElement;

/**
 * The list of the Task
 */
class TaskList implements ITaskList {
  list: ITask[];
  filter: Filters;
  query: string;

  /**
   * initialize list of tasks
   *
   * @param list list of tasks
   */
  constructor(list: ITask[], filter: Filters) {
    this.list = list;
    this.filter = filter;
    this.query = '';
  }

  /**
   * set the search query
   *
   */
  setQuery(query: string) {
    this.query = query;
  }

  /**
   * get the search query
   *
   */
  getQuery() {
    return this.query;
  }

  /**
   * Get the current filter
   *
   */
  getFilter() {
    return this.filter;
  }

  /**
   * set the current filter
   *
   */
  setFilter(filter: Filters) {
    this.filter = filter;
  }

  /**
   * get the task by id
   *
   * @param id id of the task
   * @returns Task object
   */
  getTaskById = (id: string) => {
    return this.list.find((item) => item.id === id) || null;
  };

  /**
   * get the task by index
   *
   * @param index index of the task
   * @returns task object
   */
  getTaskByIndex = (index: number) => {
    return this.list[index] || null;
  };

  /**
   * add a task to the list
   *
   * @param task
   */
  addTask = (task: ITask) => {
    this.list.push(task);
    return this.list;
  };

  /**
   * get taks list
   *
   * @returns task list
   */
  getTasks = () => {
    return this.list;
  };

  /**
   * Render the empty list
   *
   */
  renderEmptyList = () => {
    const tasksEmpty = document.createElement('div');
    tasksEmpty.classList.add('tasks-empty');

    // <div class="tasks-empty__icon">
    const emptyIcon = document.createElement('div');
    emptyIcon.classList.add('tasks-empty__icon');

    // svg icon of empty list
    const svgIcon = createImage(listSvg);

    emptyIcon.appendChild(svgIcon);

    // Append empty icon to tasksEmpty
    tasksEmpty.appendChild(emptyIcon);

    const emptyText = document.createElement('p');
    emptyText.classList.add('tasks-empty__text');
    emptyText.textContent =
      "You don't have any tasks yet. Create a new one.";

    tasksEmpty.appendChild(emptyText);

    taskListElement.appendChild(tasksEmpty);
  };

  /**
   * render list of task into the DOM
   *
   * @returns Task Wrapper DOM
   */
  render() {
    taskListElement.innerHTML = '';
    const currentFilter = this.getFilter();
    let filteredTasks: ITask[] = [];

    switch (currentFilter) {
      case Filters.COMPLETE:
        filteredTasks = this.list.filter((task) => task.completed);
        break;
      case Filters.INCOMPLETE:
        filteredTasks = this.list.filter((task) => !task.completed);
        break;
      case Filters.SEARCH:
        if (this.getQuery() === '') {
          filteredTasks = this.list;
        }
        filteredTasks = this.list.filter((task) =>
          task.title
            .toLowerCase()
            .includes(this.getQuery().toLowerCase()),
        );
        break;
      default:
        filteredTasks = this.list;
        break;
    }

    if (filteredTasks.length === 0) {
      this.renderEmptyList();
      return;
    }

    filteredTasks.forEach((task) => {
      // <div class="task">
      const wrapper = document.createElement('div');
      wrapper.classList.add('task');
      // <div class="task__content">
      const content = document.createElement('div');
      content.classList.add('task__content');

      // <h3 class="task__title">${todo?.title}</h3>
      const title = document.createElement('h3');
      title.classList.add('task__title');
      title.textContent = task.title;

      // <p class="task__text">${todo?.description || ''}</p>
      const description = document.createElement('p');
      description.classList.add('task__text');

      description.textContent = task.description || '';

      // append to content
      content.appendChild(title);
      content.appendChild(description);

      const actions = document.createElement('div');
      // <button type="button" class="btn btn-icon btn-icon--secondary complete-btn" >
      const toggleBtn = document.createElement('button');
      toggleBtn.setAttribute('type', 'button');
      toggleBtn.classList.add(
        'btn',
        'btn-icon',
        'btn-icon--secondary',
        'complete-btn',
      );

      // Button Icon
      let btnIcon;
      if (task.getCompleted()) {
        btnIcon = createImage(circleComplete);
      } else {
        btnIcon = createImage(circleOutline);
      }

      // Append the SVG to the compelte button
      toggleBtn.appendChild(btnIcon);

      // Add event listener to the toggle btn
      toggleBtn.addEventListener('click', () => {
        task.toggleCompleted();
        this.render();
      });

      actions.appendChild(toggleBtn);
      wrapper.appendChild(content);
      wrapper.appendChild(actions);

      taskListElement.appendChild(wrapper);
    });
  }
}

export default TaskList;
