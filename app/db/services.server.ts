import { db } from "./db.server";
import UserService from "./users/UserServive.server";
import TodoService from "./todos/TodoService.server";

export const userService = new UserService(db);
export const todoService = new TodoService(db);
