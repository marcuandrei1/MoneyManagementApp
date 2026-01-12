import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const [message, setMessage] = useState("Default");
  /* aceasta comanda schimba starea obiectelor si de 
    fapt tot da reload la lucruri in pagina. Un fel de re-rendering.
    'message' - variabila de stare, care contine valoarea curenta: initial e un string gol "".
    'setMessage' - functia care modifica starea (actualizeaza valoarea lui message)
    'useState('')' - seteaza valoarea initiala a starii (in cazul meu un string gol"")
  */
  return <Dashboard />;
}

export default App;
