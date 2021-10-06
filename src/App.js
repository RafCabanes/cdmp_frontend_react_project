// Api documentation can be found in  https://docs.magicthegathering.io/
import "./App.css";
import { useState, useEffect } from "react";
import React from "react";

export default function App() {
  // cardName used for search
  const[ cardName, setCardName ] = useState("defaultcard");
  // display variables used for display
  const[ displayCardName, setDisplayCardName ] = useState("");
  const[ displayCardType, setDisplayCardType] = useState("displayCardType");
  const[ displayCardArtist, setDisplayCardArtist] = useState("displayCardArtist");
  const[ displayCardSetName, setDisplayCardSetName] = useState("displayCardSetName");
  const[ displayCardRarity, setDisplayCardRarity] = useState("displayCardRarity");
  const[ displayCardImageUrl, setDisplayCardImageUrl] = useState("");
  const[isLoading, setIsLoading] = useState(false);
  
  const makeUrl = (props) => {
    const baseUrl = "https://api.magicthegathering.io/v1/cards?";
    const cardUrlName = "name=" + cardName;
    const workingUrl = (baseUrl + cardUrlName).toString();
    return workingUrl;
  };  
  
  const getCard = async () => {
    setIsLoading(true);
    const url = makeUrl(cardName);
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json"
        }
      }).then(
        async response => {
          const cardResponse = await response.json();
          setDisplayCardName(cardResponse.cards[0].name);
          setDisplayCardType(cardResponse.cards[0].type);
          setDisplayCardArtist(cardResponse.cards[0].artist);
          setDisplayCardSetName(cardResponse.cards[0].setName);
          setDisplayCardRarity(cardResponse.cards[0].rarity);
          setDisplayCardImageUrl(cardResponse.cards[0].imageUrl);
        }
        
        );
    } catch(e) {
      console.log(e.message);
    }
    setIsLoading(false);
  };
  
  const CardInfoBox = () => {
    if(displayCardName==="" || !displayCardName) return (<p></p>);
    return(
      <div className="cardDisplayBox">
        <h2>Found card: {displayCardName}</h2>
          {<ul>
            <li>Card Type: {displayCardType}</li>
            <li>Card Artist: {displayCardArtist}</li>
            <li>Card Set: {displayCardSetName}</li>
            <li>Card Rarity: {displayCardRarity}</li>
          </ul>}
      </div>
      );
  };
  
  const AppDescriptionBox = () => {
    return(
      <div className="appSearchDescription">
        <h3 >This is simple app to search for information on cards 
        from the popular trading card game Magic The Gathering. 
        To get started, please type a card name in the searchbox and 
        click the button (eg. Sigarda, Host of Herons, Plains, skyknight legionnaire ...)</h3>
        <p> for more info in the api used, please see: https://docs.magicthegathering.io/ </p>
      </div>
    );
  };
  
  const CardImageBox = () => {
    if(!displayCardImageUrl) return(<h3></h3>);
    if(displayCardImageUrl==="") return(<h3>no image available</h3>);
    return(
      <div className="cardImageBox">
        <img
          src={displayCardImageUrl}
        />
      </div>
    );
  };
  
  // useEffect to run exactly once
  useEffect(() => {
    getCard();
  }, []);
  
  return (
    <div className="App">
      {isLoading && <h1>Fetching response</h1>}
      <div className="searchbox">
        <h1>Type card name in searchbox</h1>
        <input
          type="text"
          id="cardNameInputBox"
          onChange={(event) => setCardName(event.target.value)}
        />
        <button onClick={getCard}>Search Card</button>
      </div>
      <div>
        <CardInfoBox />
        <CardImageBox />
      </div>
      <AppDescriptionBox />
    </div>
  );
}