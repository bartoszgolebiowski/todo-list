import { useLoaderData } from "remix";

type Gist = {
  url: string;
  files: string[];
  owner: string;
  description: string;
};

export const loader = async () => {
  const res = await fetch("https://api.github.com/gists");
  const json = await res.json();
  return json.map((gist: any) => {
    return {
      url: gist.html_url,
      files: Object.keys(gist.files),
      owner: gist.owner.login,
      description: gist.description,
    };
  });
};

export default () => {
  const gists = useLoaderData<Gist[]>();

  return (
    <ul>
      {gists.map((gist) => (
        <li key={gist.url}>
          <a href={gist.url}>
            {gist.description}, {gist.owner}
          </a>
          <ul>
            {gist.files.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
