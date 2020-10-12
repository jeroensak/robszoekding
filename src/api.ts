import React from "react";
import { useDebounce } from "use-debounce/lib";
import customFetch from "./customFetch";
import { IFilter } from "./Filters";

const baseUrl = "http://localhost:5000";

export const useSearch = (searchString: string, filters: IFilter[]) => {
  const [debouncedValue] = useDebounce(searchString, 300);
  const [result, setResult] = React.useState<any | null>(null);

  React.useEffect(() => {
    try {
      if (debouncedValue.length > 2) {
        performSearch(debouncedValue, filters)?.then(setResult);
      } else {
        setResult(null)
      }
    } catch (e) {
      console.error("error: ", e);
    }
  }, [debouncedValue, filters]);

  return result;
};

const performSearch = (value: string, filters: IFilter[]) => {
  return customFetch.request(`${baseUrl}/search/completedorder`, {
    method: "POST",
    // mode: 'cors',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(getSearchBody(value, filters)),
  });
};

const getSearchBody = (value: string, filters: IFilter[]) => ({
  searchTerm: value,
  minimumShouldMatch: 10,
  searchOperator: 0,
  skip: 0,
  take: 100,
  maxFilterResults: 50,
  searchMode: 3,
  filters,
});
