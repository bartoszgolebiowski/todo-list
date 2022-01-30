import { Prisma, PrismaClient, Todo } from "@prisma/client";
import ITodoService from "./ITodoService";

class TodoService implements ITodoService {
  client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  getAllTodos(): Promise<Todo[]> {
    return this.client.todo.findMany();
  }
  getUserTodos(userId: number): Promise<Todo[]> {
    return this.client.todo.findMany({ where: { userId } });
  }
  createTodo(data: Prisma.TodoCreateArgs["data"]): Promise<Todo> {
    return this.client.todo.create({ data });
  }
  editTodo(id: number, data: Prisma.TodoUpdateArgs["data"]): Promise<Todo> {
    return this.client.todo.update({ where: { id }, data });
  }
}

export default TodoService;
