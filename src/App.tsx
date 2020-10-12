import React from "react";
import "./App.css";
import { useSearch } from "./api";

function App() {
  const [value, setValue] = React.useState("");
  const searchResult = useSearch(value);

  return (
    <div className="App">
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="search..."
      />
      <div>{JSON.stringify(searchResult)}</div>
    </div>
  );
}

export default App;
