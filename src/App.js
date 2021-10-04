// import "./styles.css";
import { useState, useEffect } from "react";
import React from "react";

export default function App() {
  const[ duck, setDuck ] = useState("default duck");
  const[ card, setCard ] = useState("no card chosen");
  const[ cardName, setCardName] = useState("defaultcard")
  
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
  };
  
  const makeUrl = (props) => {
    const baseUrl = "https://api.magicthegathering.io/v1/cards?";
    const cardUrlName = "name=" + cardName;
    // const cardUrlLanguage = "&language=" + cardLanguage;
    const workingUrl = baseUrl + cardUrlName;
    return workingUrl
  };
  
  const getCard = async () => {
    setIsLoading(true);
    console.log("searching for "+ cardName);
    // const url = "https://api.magicthegathering.io/v1/cards?supertypes=legendary&types=creature&colors=black,white&pageSize=2";
    const url = makeUrl(cardName);
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json"
        }
      }).then(
        async response => {
          // console.log(response);
          const cardResponse = await response.json();
          // foreach cardItem in cardResponse.cards array
          for(var cardItem in cardResponse.cards) {
            console.log("index: " + cardItem);
            console.log(cardResponse.cards[cardItem]);
          }
          
          // name of first card result
          // console.log(cardResponse.cards[0].name);
          
        }
        
        )
    } catch(e) {
      console.log(e.message)
    }
    setIsLoading(false);
  }
  
  // useEffect exactly once
  useEffect(() => {
    // getData();
    getCard();
  }, []);

  return (
    <div className="App">
      {isLoading && <h1>currently fetching response</h1>}
      <div className="searchbox">
        <h1>Type card name in searchbox</h1>
        <input
          type="text"
          id="cardNameInputBox"
          onChange={(event) => setCardName(event.target.value)}
        />
        <button onClick={getCard}>Search Card</button>
      </div>
      
      <div className="cardDisplayBox">
      </div>
    </div>
  );
}