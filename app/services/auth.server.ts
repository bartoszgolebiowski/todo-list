import { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcrypt";
import { userRepository } from "~/db/repositories.server";
import { sessionStorage } from "~/services/session.server";

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const errors: { title?: true; password?: true } = {};
    if (!email) errors.title = true;
    if (!password) errors.password = true;

    if (Object.keys(errors).length) {
      const missingFields = Object.keys(errors).map((k) => k.toUpperCase());
      throw new Error("Missing fields: " + missingFields.join(", "));
    }

    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      throw new Error("Invalid email or password");
    }
    return user;
  }),
  "email-password"
);
