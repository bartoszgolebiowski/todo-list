import { PrismaClient, User, Prisma } from "@prisma/client";
import IUserRepository from "./IUserRepository";

class UserRepository implements IUserRepository {
  client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  getAllUsers(): Promise<User[]> {
    return this.client.user.findMany();
  }
  getUserById(id: number): Promise<User | null> {
    return this.client.user.findFirst({ where: { id } });
  }
  getUserByEmail(email: string): Promise<User | null> {
    return this.client.user.findFirst({ where: { email } });
  }
  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.client.user.create({ data });
  }
}

export default UserRepository;
