import "./App.css";
import { useState, useEffect } from "react";
import React from "react";

export default function App() {
  // const[ duck, setDuck ] = useState("default duck");
  const[ card, setCard ] = useState("no card chosen");
  const[ cardName, setCardName ] = useState("defaultcard");
  
  const[ displayCardName, setDisplayCardName ] = useState("displayCardName");
  const[ displayCardType, setDisplayCardType] = useState("displayCardType");
  const[ displayCardArtist, setDisplayCardArtist] = useState("displayCardArtist");
  const[ displayCardSetName, setDisplayCardSetName] = useState("displayCardSetName");
  const[ displayCardRarity, setDisplayCardRarity] = useState("displayCardRarity");
  const[ displayCardImageUrl, setDisplayCardImageUrl] = useState("");
  // const cardsReceived = []
  // const artistArray =["testitem", "seconditem", "thriditem", "fourthitem"]
  // const artistArray =[]
  const [isLoading, setIsLoading] = useState(false);
  
  // const emptyCardsReceivedArray = () => {
  //   // cardsReceived = [];
  //   // empty cardsReceived array by setting length to 0
  //   cardsReceived.length = 0;
  //   artistArray.length =0;
  // };
  
  const makeUrl = (props) => {
    const baseUrl = "https://api.magicthegathering.io/v1/cards?";
    const cardUrlName = "name=" + cardName;
    // const cardUrlPageSize = "&pageSize=" + pageSize;
    const workingUrl = baseUrl + cardUrlName;
    return workingUrl;
  };  
  
  // const getCharacterData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const url = "https://thronesapi.com/api/v2/Characters/13";
  //     // const url = "https://random-d.uk/api/random";
  //     const response = await fetch(url, {
  //       headers: {
  //         Accept: "application/json"
          
  //       }
  //     }).then(
  //       async response => {
  //         try {
  //           const thronesCharacter = await response.json();
  //           console.log(thronesCharacter)
  //           console.log("received character")
  //           setDuck(thronesCharacter.imageUrl)
  //           // console.log(thronesCharacter.firstName)
  //         } catch (e) {
  //           console.log(e)
  //         }
  //       }
  //     )
  //     // setDuck(thronesJson.url);
  //     // console.log(duck)
  //     // console.log(response.json)
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  //   // const response = await fetch(url);
  //   // console.log(response);
  //   // const receivedDuck = await response.json();
  //   // setDuck(receivedDuck.url[0]);
  //   setIsLoading(false);
  // };
  
  const getCard = async () => {
    setIsLoading(true);
    checkCardValuesConsole();
    // emptyCardsReceivedArray();
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
          const cardResponse = await response.json();
          
          setDisplayCardName(cardResponse.cards[0].name);
          setDisplayCardType(cardResponse.cards[0].type);
          setDisplayCardArtist(cardResponse.cards[0].artist);
          setDisplayCardSetName(cardResponse.cards[0].setName);
          setDisplayCardRarity(cardResponse.cards[0].rarity);
          setDisplayCardImageUrl(cardResponse.cards[0].imageUrl);
          
          checkCardValuesConsole();
          // console.log("listing cardResponse cards as received")
          // console.log(cardResponse.cards);
          
          // name of first card result
          // console.log(cardResponse.cards[0].name);
          
          // for(var cardItem in cardResponse.cards) {
          //   cardsReceived.push(cardResponse.cards[cardItem])
          //   // console.log("added from cardResponse:")
          //   // console.log(cardResponse.cards[cardItem])
          //   // console.log("added to cardsReceived: ")
          //   // console.log(cardsReceived[cardItem])
          // }
          // console.log(cardsReceived.length)
          
          // console.log(cardsReceived)
          // displayCardsInConsole();
          // saveCardArtistArray(cardsReceived);
        }
        
        )
    } catch(e) {
      console.log(e.message)
    }
    setIsLoading(false);
  }
  
  const checkCardValuesConsole = () => {
    console.log(displayCardName);
    console.log(displayCardType);
    console.log(displayCardArtist);
    console.log(displayCardSetName);
    console.log(displayCardRarity);
    console.log(displayCardImageUrl);
  };
  
  // const saveCardArtistArray = (cardsReceived) => {
    // artistArray.length = 0
    // for(var card in cardsReceived) {
      // if(artistArray.includes(cardsReceived[card].artist)) {
        // // duplicate artist not added
      // } else {
        // artistArray.push(cardsReceived[card].artist)
      // }
    // }
    // // console.log(artistArray)
  // }
  
  // const displayCardsInConsole = () => {
  //   for(var cardNumber in cardsReceived) {
  //     console.log(cardsReceived[cardNumber].name)
  //     console.log(cardsReceived[cardNumber].type)
  //     console.log(cardsReceived[cardNumber].artist)
  //     console.log(cardsReceived[cardNumber].setName)
  //     console.log(cardsReceived[cardNumber].rarity)
  //     console.log(cardsReceived[cardNumber].imageUrl)
  //   }
  // }
  
  // const DisplayCardsReceived = () => {
  //   for(var cardNumber in cardsReceived) {
  //     JSON.stringify(cardsReceived[cardNumber])
  //     console.log(cardsReceived[cardNumber])
  //   }
  //   try {
  //   return(
  //     <ul>{
  //       <li>{cardsReceived}</li>
  //     }</ul>
  //     )
  //   } catch (e) {
  //     console.log(e.message)
  //     return null
  //   }
  // }
  
  // function ListItem(props) {
    // return <li>{props.value}</li>;
  // }
  
  // const DisplayArtistArray = (props) => {
    // const artistArray = props.artistArray;
    // if(isLoading) {
      // return <h1> Loading </h1>;
    // }
    // return (
      // <ul>
        // {artistArray.map((artist) =>
          // <ListItem key={artist.toString()}
                    // value={artist} />
        // )}
      // </ul>
    // );
    // // return(
    // //   <ul>
    // //     {artistArray.map((artist) => (
    // //     <li>{artist}</li>
    // //     ))}
    // //   </ul>
    // // );
  // };
  
  const CardInfoBox = () => {
    return(
      <div>
        <h1> Card Info</h1>
          {<ul>
            <li>Card Name: {displayCardName}</li>
            <li>Card Type: {displayCardType}</li>
            <li>Card Artist: {displayCardArtist}</li>
            <li>Card Set: {displayCardSetName}</li>
            <li>Card Rarity {displayCardRarity}</li>
          </ul>}
      </div>
      )
    // return null;
  };
  
  const CardImageBox = () => {
    if(displayCardImageUrl==="" || !displayCardImageUrl) return(<h3>no image available</h3>);
    return(
      <div>
        <img
          src={displayCardImageUrl}
          // alt="new"
        />
      </div>
    )
  }
  
  // useEffect exactly once
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
      
      <div className="cardDisplayBox">
        <CardInfoBox />
        <CardImageBox />
      </div>
    </div>
  );
}