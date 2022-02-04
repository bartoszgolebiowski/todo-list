import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "alice@prisma.io",
    passwordHash: bcrypt.hashSync("password123", 10),
    todo: {
      create: [
        {
          title: "Learn JS",
          description: "Javascript is a programming language",
        },
        {
          title: "Learn React",
          description: "It would be fantastic to learn React",
        },
        {
          title: "Learn Remix",
          description: "I want to learn remix",
        },
      ],
    },
  },
  {
    email: "john@prisma.io",
    passwordHash: bcrypt.hashSync("password123", 10),
    todo: {
      create: [
        {
          title: "Read a book",
          description: "I want to read a book",
        },
        {
          title: "Enroll in a course",
          description: "I want to enroll in a course",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    await prisma.user.create({
      data: u,
    });
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
