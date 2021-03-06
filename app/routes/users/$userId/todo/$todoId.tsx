import React from "react";
import { Todo } from "@prisma/client";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  ThrownResponse,
  useActionData,
  useCatch,
  useLoaderData,
} from "remix";
import { todoRepository } from "~/db/repositories.server";
import { authenticator } from "~/services/auth.server";

type ThrownResponses = ThrownResponse<403>;
type FormErrors = { title?: true; description?: true };

export const loader: LoaderFunction = async ({ request, params }) => {
  const todoId = Number(params.todoId);
  const userId = Number(params.userId);
  const loggedUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  const todo = await todoRepository.getTodo(todoId);
  if (todo && todo.userId !== loggedUser.id && todo.userId !== userId) {
    throw json(null, { status: 403 });
  }
  return todo;
};

export const action: ActionFunction = async ({ request, params }) => {
  const todoId = Number(params.todoId);
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const errors: FormErrors = {};
  if (!title) errors.title = true;
  if (!description) errors.description = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  const todo = await todoRepository.editTodo(todoId, {
    description,
    title,
  });

  return redirect(`users/${todo.userId}/todo`);
};

export default () => {
  const errors = useActionData<FormErrors>();
  const todo = useLoaderData<Todo | null>();

  if (!todo) {
    return <h2>Todo does not exist.</h2>;
  }

  return (
    <>
      <div>
        <Form method="post" key={todo.id}>
          <p>
            <label>
              Title: {errors?.title && <em>Title is required</em>}
              <input type="text" defaultValue={todo?.title} name="title" />
            </label>
          </p>
          <p>
            <label>
              Description:
              {errors?.description && <em>Description is required</em>}
              <input
                type="text"
                defaultValue={todo.description}
                name="description"
              />
            </label>
          </p>
          <p>
            <button type="submit">Submit</button>
          </p>
        </Form>
      </div>
      <style>{`em { color: red }`}</style>
    </>
  );
};

export const CatchBoundary = () => {
  const caught = useCatch<ThrownResponses>();

  switch (caught.status) {
    case 403:
      return (
        <div>
          <p>You cannot edit someone else todo</p>
        </div>
      );
    default:
      return <div>Something went wrong</div>;
  }
};
