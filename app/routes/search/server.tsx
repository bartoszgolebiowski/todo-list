import React from "react";
import {
  Form,
  LoaderFunction,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "remix";

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("query") ?? "";
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?q=${q}`);
  const json = await res.json();
  return json.splice(0, 100);
};

export default () => {
  const submit = useSubmit();
  const [params] = useSearchParams();
  const photos = useLoaderData<Photo[]>();

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    submit(e.currentTarget, { replace: true });
  };

  return (
    <>
      <Form onChange={handleChange}>
        <label>
          Search:
          <input
            type="text"
            name="query"
            defaultValue={params.get("query") ?? ""}
          />
        </label>
      </Form>
      <ul>
        {photos.map((photo) => (
          <li key={photo.title}>{photo.title}</li>
        ))}
      </ul>
    </>
  );
};
