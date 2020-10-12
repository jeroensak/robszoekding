import React from "react";
import { useDebounce } from "use-debounce/lib";

const baseUrl = "http://localhost:5200";

export const useSearch = (searchString: string) => {
  const [debouncedValue] = useDebounce(searchString, 200);
  const [result, setResult] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (debouncedValue.length > 3) {
      performSearch(debouncedValue).then(setResult);
    }
  }, [debouncedValue]);

  return result;
};

const performSearch = (value: string) => {
  return fetch(`${baseUrl}/search/completedorder`, {
    method: "POST",
    // mode: 'cors',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(getSearchBody(value)),
  })
    .then((res) => res.json())
    .catch((e) => console.error("e", e));
};

const getSearchBody = (value: string) => ({
  searchTerm: value,
  minimumShouldMatch: 10,
  searchOperator: 0,
  skip: 0,
  take: 100,
  maxFilterResults: 100,
  searchMode: 0,
});
