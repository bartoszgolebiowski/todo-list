import React from "react";
import { Todo } from "@prisma/client";
import {
  json,
  Link,
  LoaderFunction,
  Outlet,
  ThrownResponse,
  useCatch,
  useLoaderData,
} from "remix";
import { todoRepository } from "~/db/repositories.server";
import { authenticator } from "~/services/auth.server";

type ThrownResponses = ThrownResponse<403>;

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  const userId = Number(params.userId);
  if (userId !== user.id) {
    throw json([], { status: 403 });
  }
  return todoRepository.getUserTodos(Number(params.userId));
};

export default () => {
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
      <Link to="new">Create todo</Link>
      <Outlet />
    </>
  );
};

export const CatchBoundary = () => {
  const caught = useCatch<ThrownResponses>();

  switch (caught.status) {
    case 403:
      return (
        <div>
          <p>You can only see details for yours todo</p>
        </div>
      );
    default:
      return (
        <div>
          <p>Something went wrong</p>
        </div>
      );
  }
};
