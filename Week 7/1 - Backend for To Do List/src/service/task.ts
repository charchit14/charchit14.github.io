// services/task.js
import * as modelTask from '../model/task';
import type { Task } from '../interface/task';

export const getTasks = () => {
  try {
    const data = modelTask.getTasks();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Error retrieving tasks.' };
  }
};

export const createTask = (task: Task) => {
  try {
    modelTask.addTask(task);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error creating task.' };
  }
};

export const editTask = (updatedTask: Task) => {
  try {
    modelTask.editTask(updatedTask);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error updating task.' };
  }
};

export const deleteTask = (taskId: string) => {
  try {
    modelTask.deleteTask(taskId);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error deleting task.' };
  }
};
