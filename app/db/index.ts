import client from "./client";
import UserService from "./users/UserServive";
import TodoService from "./todos/TodoService";

export const userService = new UserService(client);
export const todoService = new TodoService(client);
