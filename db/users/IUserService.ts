import { User } from "@prisma/client";

interface IUserService {
  getUser(id: number): Promise<User | null>;
  createUser(email: string): Promise<User>;
}

export default IUserService;
