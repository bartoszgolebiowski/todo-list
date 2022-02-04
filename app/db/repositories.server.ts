import { db } from "./db.server";
import UserRepository from "./users/UserRepository.server";
import TodoRepository from "./todos/TodoService.server";

export const userRepository = new UserRepository(db);
export const todoRepository = new TodoRepository(db);
