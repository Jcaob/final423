import "./App.css";
import Pages from "./Components/pages/Pages";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <h1 className="App">
      <BrowserRouter>
        <Pages></Pages>
      </BrowserRouter>
    </h1>
  );
}

export default App;
