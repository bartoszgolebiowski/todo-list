import { Prisma, PrismaClient, Todo } from "@prisma/client";
import ITodoRepository from "./ITodoRepository";

class TodoRepository implements ITodoRepository {
  client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  getTodo(id: number): Promise<Todo | null> {
    return this.client.todo.findFirst({ where: { id } });
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

export default TodoRepository;
