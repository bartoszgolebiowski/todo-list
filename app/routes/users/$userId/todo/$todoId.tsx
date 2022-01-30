import React from "react";
import { Todo } from "@prisma/client";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { todoService } from "~/db/services.server";

export const loader: LoaderFunction = ({ params }) => {
  const todoId = Number(params.todoId);
  return todoService.getTodo(todoId);
};

export const action: ActionFunction = async ({ request, params }) => {
  const todoId = Number(params.todoId);
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const errors: { title?: true; description?: true } = {};
  if (!title) errors.title = true;
  if (!description) errors.description = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  const todo = await todoService.editTodo(todoId, {
    description,
    title,
  });

  return redirect(`users/${todo.userId}/todo`);
};

const Todo = () => {
  const errors = useActionData();
  const todos = useLoaderData<Todo>();

  return (
    <>
      <div>
        <Form method="post">
          <p>
            <label>
              Title: {errors?.title && <em>Title is required</em>}
              <input type="text" defaultValue={todos.title} name="title" />
            </label>
          </p>
          <p>
            <label>
              Description:{" "}
              {errors?.description && <em>Description is required</em>}
              <input
                type="text"
                defaultValue={todos.description}
                name="description"
              />
            </label>
          </p>
          <p>
            <button type="submit">Submit</button>
          </p>
        </Form>
      </div>
      <style>{`em { color:red }`}</style>
    </>
  );
};

export default Todo;
