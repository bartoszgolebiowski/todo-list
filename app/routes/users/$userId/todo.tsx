import React from "react";
import { Todo } from "@prisma/client";
import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { todoService } from "~/db/services.server";

export const loader: LoaderFunction = ({ params }) => {
  return todoService.getUserTodos(Number(params.userId));
};

const UserTodos = () => {
  const todos = useLoaderData<Todo[]>();
  return (
    <>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Link to={`${todo.id}`}>{todo.title}</Link>
              <p>{todo.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default UserTodos;
