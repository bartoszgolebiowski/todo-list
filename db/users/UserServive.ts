import { PrismaClient, User } from "@prisma/client";
import IUserService from "./IUserService";

class UserService implements IUserService {
  client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  getUser(id: number): Promise<User | null> {
    return this.client.user.findFirst({ where: { id } });
  }
  createUser(email: string): Promise<User> {
    return this.client.user.create({ data: { email } });
  }
}

export default UserService;
