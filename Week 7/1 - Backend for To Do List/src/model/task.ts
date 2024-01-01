import type { Task } from '../interface/task';

let tasks: Task[] = [
  {
    id: '1',
    title: 'Task one',
    description: 'Task description',
    completed: false,
  },
  {
    id: '2',
    title: 'Task Two',
    completed: false,
  },
  {
    id: '3',
    title: 'Task Three',
    description: 'Task description',
    completed: true,
  },
];

export const getTaskById = (id: string) =>
  tasks.find(({ id: taskId }) => taskId === id);

export const getTasks = () => tasks;

export const addTask = (task: Task) => {
  tasks.push(task);
};

export const editTask = (updatedTask: Task) => {
  const index = tasks.findIndex(({ id }) => id === updatedTask.id);

  if (index !== -1) {
    // Update the existing task with the provided data
    tasks[index] = {
      ...tasks[index],
      ...updatedTask,
    };
  } else {
    throw new Error('Task not found');
  }
};

export const deleteTask = (id: string) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
  } else {
    throw new Error('Task not found');
  }
};
