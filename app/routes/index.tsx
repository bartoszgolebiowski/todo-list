// app/routes/login.tsx
import { Form, ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator } from "~/services/auth.server";

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export let action: ActionFunction = async ({ request }) => {
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure
  return await authenticator.authenticate("email-password", request, {
    successRedirect: "/users",
    failureRedirect: "/",
  });
};

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export let loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  await authenticator.isAuthenticated(request, {
    successRedirect: "/users",
  });
  return {};
};

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default () => {
  return (
    <Form method="post">
      <p>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
      </p>
      <p>
        <label>
          Password:
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </label>
      </p>
      <button>Sign In</button>
    </Form>
  );
};
