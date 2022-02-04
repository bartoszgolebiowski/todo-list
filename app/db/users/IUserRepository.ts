import { Prisma, User } from "@prisma/client";

interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
}

export default IUserRepository;
