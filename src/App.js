// import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [dadJoke, setDadJoke] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    setDadJoke("");
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json"
      }
    });
    const data = await response.json();
    setDadJoke(data.joke);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {isLoading && <h1>currently fetching dad joke...</h1>}
      <h1>{dadJoke}</h1>
      <button onClick={getData}>Get new dad joke</button>
    </div>
  );
}