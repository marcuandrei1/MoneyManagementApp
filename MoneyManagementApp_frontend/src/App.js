import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import sidebar from "./components/sidebar";

function App() {
  const [message, setMessage] = useState("Default");
  /* aceasta comanda schimba starea obiectelor si de 
    fapt tot da reload la lucruri in pagina. Un fel de re-rendering.
    'message' - variabila de stare, care contine valoarea curenta: initial e un string gol "".
    'setMessage' - functia care modifica starea (actualizeaza valoarea lui message)
    'useState('')' - seteaza valoarea initiala a starii (in cazul meu un string gol"")
  */

  // useEffect(() => {
  //   //trimite un request la url-ul meu ca sa ia textul de acolo sau ce e nevoie
  //    fetch("http://localhost:8080/home")
  //   .then(response => response.text())   // așteaptă să se convertească în text
  //   .then(my_text => setMessage(my_text))  // actualizează state-ul React
  //   .catch(error => console.error("Eroare la fetch:", error));
  // },[])

  // return (
  //   <h1>Mesajul meu este: {message}</h1>
  // );

  return sidebar();
}

export default App;
