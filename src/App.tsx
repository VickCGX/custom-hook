import React from "react";

import "./App.css";

import useUniqViewSeconds from "./libs/hooks/useUniqViewSeconds";

function App() {
  const { uniqueSortedList } = useUniqViewSeconds(
    "https://664ac067a300e8795d42d1ff.mockapi.io/api/v1/numbers/1"
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="App">Result is: {`[${uniqueSortedList}]`}</div>
    </div>
  );
}

export default App;
