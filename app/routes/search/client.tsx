import { useState, useEffect } from "react";
import { useSearchParams } from "remix";

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const useFetch = (url: string, q: string) => {
  const [data, setData] = useState<Photo[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (url: string) => {
      setLoading(true);
      const res = await fetch(`${url}?q=${q}`);
      const json = await res.json();
      setLoading(false);
      return json;
    };
    fetchData(url).then(setData);
  }, [url, q]);

  return { data, isLoading };
};

export default () => {
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get("query") ?? "");
  const photos = useFetch("https://jsonplaceholder.typicode.com/photos", q);

  return (
    <ul>
      <label>
        Search:
        <input value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      {photos.isLoading ? (
        <>Loading...</>
      ) : (
        photos.data.map((photo) => <li key={photo.title}>{photo.title}</li>)
      )}
    </ul>
  );
};
