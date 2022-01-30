import { Todo, Prisma } from "@prisma/client";

interface ITodoService {
  getAllTodos(): Promise<Todo[]>;
  getUserTodos(userId: number): Promise<Todo[]>;
  createTodo(todo: Prisma.TodoCreateArgs["data"]): Promise<Todo>;
  editTodo(id: number, todo: Prisma.TodoUpdateArgs["data"]): Promise<Todo>;
}

export default ITodoService;
