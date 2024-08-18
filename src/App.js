import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";

console.log("man");

function App() {
  const [SearchValue, setSearchValue] = useState("");
  const [SearchPressed, setSearchPressed] = useState(false);
  const [data, setdata] = useState({});
  const [condition, setCondition] = useState("ri-sun-line")
  console.log(data);
  return (
    <div className="App">
      <Navbar
        setSearchValue={setSearchValue}
        SearchValue={SearchValue}
        setSearchPressed={setSearchPressed}
        setdata={setdata}
      />
      <Weather
        SearchValue={SearchValue}
        SearchPressed={SearchPressed}
        data={data}
      />
    </div>
  );
}
export default App;
