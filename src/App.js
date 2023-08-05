import logo from "./logo.svg";
import "./App.css";
import ButtonAppBar2 from "./Components/ButtonAppBar2";
import ResponsiveGrid from "./Components/ResponsiveGrid";
import * as React from "react";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const searchHandler = (searchVal) => {
    setSearchTerm(searchVal);
    console.log(searchVal);
  };

  return (
    <>
      <ButtonAppBar2 searchHandleFun={searchHandler} />
      <ResponsiveGrid searchTerm={searchTerm} />
    </>
  );
}

export default App;
