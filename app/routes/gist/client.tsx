import { useState, useEffect } from "react";

type Gist = {
  url: string;
  files: string[];
  owner: string;
  description: string;
};

const useFetch = (url: string) => {
  const [data, setData] = useState<Gist[]>([]);

  useEffect(() => {
    const fetchData = async (url: string) => {
      const res = await fetch(url);
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
    fetchData(url).then(setData);
  }, [url]);

  return data;
};

export default () => {
  const gists = useFetch("https://api.github.com/gists");

  if (!gists.length) {
    return <>Loading...</>;
  }

  return (
    <ul>
      {gists.map((gist) => (
        <li key={gist.url}>
          <a href={gist.url}>
            {gist.description}, {gist.owner}
          </a>
          <ul>
            {gist.files.map((key) => (
              <li>{key}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
