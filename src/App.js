// import { Button, ButtonGroup } from "@chakra-ui/react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </div>
  );
}

export default App;
