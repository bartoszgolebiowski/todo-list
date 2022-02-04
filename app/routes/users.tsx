import { User } from "@prisma/client";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { userRepository } from "~/db/repositories.server";
import { authenticator } from "~/services/auth.server";
import userStyles from "~/styles/users.css";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  return userRepository.getAllUsers();
};

export const headers = () => {
  return {
    "X-Stretchy-Pants": "its for fun",
  };
};

export const links = () => {
  return [{ rel: "stylesheet", href: userStyles }];
};

export default () => {
  const users = useLoaderData<User[]>();

  return (
    <div>
      <ul>
        {users.map((user) => (
          <p key={user.id}>
            <Link to={`${user.id}/todo`} prefetch={"intent"}>
              {user.email}
            </Link>
          </p>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
