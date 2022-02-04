import {
  ActionFunction,
  Form,
  json,
  redirect,
  ThrownResponse,
  useActionData,
  useCatch,
} from "remix";
import { todoRepository } from "~/db/repositories.server";

type ThrownResponses = ThrownResponse<403>;
type FormErrors = { title?: true; description?: true };

export const action: ActionFunction = async ({ request, params }) => {
  const userId = Number(params.userId);
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const errors: FormErrors = {};
  if (!title) errors.title = true;
  if (!description) errors.description = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  const todo = await todoRepository.createTodo({
    description,
    title,
    userId,
  });

  return redirect(`users/${todo.userId}/todo`);
};

export default () => {
  const errors = useActionData<FormErrors>();

  return (
    <>
      <div>
        <Form method="post">
          <p>
            <label>
              Title: {errors?.title && <em>Title is required</em>}
              <input type="text" name="title" />
            </label>
          </p>
          <p>
            <label>
              Description:
              {errors?.description && <em>Description is required</em>}
              <input type="text" name="description" />
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
          <p>You cannot create todo: CatchBoundary</p>
        </div>
      );
    default:
      return <div>Something went wrong</div>;
  }
};

export const ErrorBoundary = () => {
  return <div>Something went wrong: ErrorBoundary</div>;
};
