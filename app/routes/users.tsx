import React from "react";
import { User } from "@prisma/client";
import { Link, Outlet, useLoaderData } from "remix";
import { userService } from "~/db";

export const loader = () => {
  return userService.getAllUsers();
};

const Users = () => {
  const users = useLoaderData<User[]>();
  return (
    <div style={{ display: "flex" }}>
      <ul>
        {users.map((user) => (
          <p key={String(user.id)}>
            <Link to={`${user.id}/todo`}>{user.email}</Link>
          </p>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default Users;
