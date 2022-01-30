import { User } from "@prisma/client";

interface IUserService {
  getAllUsers(): Promise<User[]>;
  getUser(id: number): Promise<User | null>;
  createUser(email: string): Promise<User>;
}

export default IUserService;
