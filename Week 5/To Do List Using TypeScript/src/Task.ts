import { ID_LENGTH } from './constants';
import { getRandomString } from './utils';

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  toggleCompleted: () => void;
  setCompleted: (complete: boolean) => void;
  getCompleted: () => boolean;
}

/**
 * Our Task class
 *
 */
class Task implements ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;

  /**
   * initialize Task object
   *
   * @param title title of the task
   * @param description description of the task
   * @param completed status of the task
   */
  constructor(title: string, description: string, completed: boolean) {
    this.id = getRandomString(ID_LENGTH);
    this.title = title;
    this.description = description;
    this.completed = completed;
  }

  /**
   * toggle the complete status of
   * the task
   *
   */
  toggleCompleted = () => {
    this.completed = !this.completed;
  };

  /**
   * set the completed status for the given task
   *
   * @param completed
   */
  setCompleted = (completed: boolean = true) => {
    this.completed = completed;
  };

  /**
   * get the status of the task
   *
   * @returns status of the task
   */
  getCompleted = () => {
    return this.completed;
  };
}

export default Task;
