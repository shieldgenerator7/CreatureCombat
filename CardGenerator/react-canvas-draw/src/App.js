import logo from './logo.svg';
import './App.css';
import Canvas from './Components/Canvas';
import Creature from './Data/Creature';
import { useState } from 'react';
import EditPanel from './Components/EditPanel';
import { parsePasteFromExcel } from './Utility/Parser';
import CardListPanel from './Components/CardListPanel';
import Storage from './Utility/Storage';

function App() {
    //Storage
    let storage;
    let setStorage = (s) => { storage = s; };
    const defaultStorage = () => new Storage();
    [storage, setStorage] = useState(defaultStorage);
    //Card
    let card = new Creature();
    let setCard = (c) => {
        card = c;
        storage.cardList = cardList;
    };
    const defaultCard = () => storage.cardList[0] ?? new Creature();
    [card, setCard] = useState(defaultCard);
    window.card = card;
    let updateCard = (oldcard) => {
        let newcard = JSON.parse(JSON.stringify(oldcard));
        Object.setPrototypeOf(newcard, Creature.prototype);
        //
        if (cardList.includes(oldcard)) {
            let index = cardList.indexOf(oldcard);
            cardList.splice(index, 1, newcard);
        }
        //
        setCard(newcard);
        storage.cardList = cardList;
    }
    //Paste String
    let pasteString = "";
    let setPasteString = (s) => { pasteString = s; };
    const defaultPasteString = () => "";
    [pasteString, setPasteString] = useState(defaultPasteString);
    window.pasteString = pasteString;
    //Autodownload
    let autoDownload = false;
    let setAutoDownload = (b) => { autoDownload = b; };
    const defaultAutoDownload = () => false;
    [autoDownload, setAutoDownload] = useState(defaultAutoDownload);
    let lastDownloadedIndex = -1;
    //Card List
    let cardList = [];
    let setCardList = (list) => {
        cardList = list;
        storage.cardList = cardList;
    };
    const defaultCardList = () => storage.cardList ?? [card];
    [cardList, setCardList] = useState(defaultCardList);
    //
    if (pasteString) {
        cardList = parsePasteFromExcel(pasteString);
        if (cardList.length < 1) {
            cardList.push(new Creature());
        }
        window.cardList = cardList;
        //
        // card = cardList[0];
        console.log("AUTO1", autoDownload);
        setAutoDownload(true);
        console.log("AUTO2", autoDownload);
        autoDownload = true;
        console.log("AUTO3", autoDownload);
        for (let i = 0; i < cardList.length; i++) {
            console.log("AUTO3", autoDownload, i);
            setCard(cardList[i]);
        }
        console.log("AUTO4", autoDownload);
        setCardList([...cardList]);
        setAutoDownload(false);
        setPasteString("");
    }
    console.log("AUTO5", autoDownload);
    // console.log("autoDownload", autoDownload);
    //

    return (
        <div className="App">
            <header className="App-header">
                <CardListPanel
                    cardList={cardList}
                    setCardList={setCardList}
                    setCard={setCard}
                ></CardListPanel>
                <Canvas
                    card={card}
                    autoDownload={autoDownload}
                ></Canvas>
                <EditPanel
                    card={card}
                    setCard={setCard}
                    updateCard={updateCard}
                    pasteString={pasteString}
                    setPasteString={setPasteString}
                ></EditPanel>
            </header>
        </div>
    );
}

export default App;
