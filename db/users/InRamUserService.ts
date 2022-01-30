import { User } from "@prisma/client";
import IUserService from "./IUserService";

class UserService implements IUserService {
  users: User[] = [];
  constructor(users = []) {
    this.users = users;
  }
  getUser(id: number): Promise<User | null> {
    return Promise.resolve(this.users.find((user) => user.id === id) ?? null);
  }
  createUser(email: string): Promise<User> {
    return Promise.resolve({ id: this.users.length + 1, email });
  }
}

export default UserService;
