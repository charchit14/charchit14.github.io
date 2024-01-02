import type { User } from '../interface/user';
import { getRandomString } from '../utils';

const users: User[] = [
  {
    id: getRandomString(),
    name: 'User 1',
    email: 'user1@test.com',
    password:
      '$2b$10$W./GL4g9fKuIyLYzH6BsQe7LzvX2l.uEcintM5LyhQN4miHPfHlwa',
  },
  {
    id: getRandomString(),
    name: 'User 2',
    email: 'user2@test.com',
    password:
      '$2b$10$sPJYyf75p6V/GPfxBhmNL.vqIlY.o65IYk4CWfpXQWnoW8AIffCEe',
  },
  {
    id: getRandomString(),
    name: 'User 3',
    email: 'user3@test.com',
    password:
      '$2b$10$tW.NR6oPKAIa6BPRX5fs0eM7Py4rxUbVOysRafdxWp4MULE9wvjVW',
  },
];

export const getUsers = () => {
  return users;
};

export const getUserById = (id: string) => {
  return users.find(({ id: userId }) => userId === id);
};

export const getUserByEmail = (email: string) => {
  const user = users.find(
    ({ email: userEmail }) => userEmail === email
  );
  return user;
};

export const addUser = (user: User) => {
  users.push(user);
};
