import React from "react";
import { User } from "@prisma/client";
import { Link, Outlet, useLoaderData } from "remix";
import { userService } from "~/db/services.server";

export const loader = () => {
  return userService.getAllUsers();
};

const Users = () => {
  const users = useLoaderData<User[]>();
  return (
    <>
      <div>
        <ul>
          {users.map((user) => (
            <p key={user.id}>
              <Link to={`${user.id}/todo`}>{user.email}</Link>
            </p>
          ))}
        </ul>
        <Outlet />
      </div>
      <style>{`
        div {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default Users;
