// import "./styles.css";
import { useState, useEffect } from "react";
import React from "react";

export default function App() {
  const[ duck, setDuck ] = useState("default duck");
  const[ card, setCard ] = useState("no card chosen");
  const [isLoading, setIsLoading] = useState(false);
  
  const getData = async () => {
    setIsLoading(true);
    try {
      const url = "https://thronesapi.com/api/v2/Characters/13";
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
  
  const getCard = async () => {
    setIsLoading(true);
    const url = "https://api.magicthegathering.io/v1/cards?supertypes=legendary&types=creature&colors=black,white&pageSize=2";
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json"
        }
      }).then(
        async response => {
          // console.log(response);
          const cardResponse = await response.json();
          // console.log(cardResponse.cards);
          for(var cardItem in cardResponse.cards) {
            console.log("index: " + cardItem);
            console.log(cardResponse.cards[cardItem]);
          }
          // console.log(cardResponse.cards[0].name);
          
        }
        
        )
    } catch(e) {
      console.log(e.message)
    }
    setIsLoading(false);
  }
  
  function printCards(card, index) {
    console.log(card)
  }
  // useEffect exactly once
  useEffect(() => {
    // getData();
    getCard();
  }, []);

  return (
    <div className="App">
      {isLoading && <h1>currently fetching response</h1>}
      <h1>{duck}</h1>
      <button onClick={getCard}>Get new response</button>
    </div>
  );
}