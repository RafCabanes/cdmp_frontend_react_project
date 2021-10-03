// import "./styles.css";
import { useState, useEffect } from "react";
import React from "react";

export default function App() {
    const[ duck, setDuck ] = useState("default duck");
    const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    // console.log(duck);
    // const url = "https://random-d.uk/api/random";
    try {
      const url = "https://thronesapi.com/api/v2/Characters/11";
      // const url = "https://random-d.uk/api/random";
      const response = await fetch(url, {
        headers: {
          Accept: "application/json"
          
        }
      }).then(
        async response => {
          try {
            const thronesCharacter = await response.json();
            console.log(thronesCharacter)
            console.log("received character")
            setDuck(thronesCharacter.imageUrl)
            // console.log(thronesCharacter.firstName)
          } catch (e) {
            console.log(e)
          }
        }
      )
      // setDuck(thronesJson.url);
      // console.log(duck)
      // console.log(response.json)
    } catch (e) {
      console.log(e.message);
    }
    
    
    // const response = await fetch(url);
    // console.log(response);
    // const receivedDuck = await response.json();
    // setDuck(receivedDuck.url[0]);
    setIsLoading(false);
  }
  // useEffect exactly once
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {isLoading && <h1>currently fetching duck</h1>}
      <h1>{duck}</h1>
      <button onClick={getData}>Get new dad joke</button>
    </div>
  );
}