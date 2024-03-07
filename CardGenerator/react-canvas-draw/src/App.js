import logo from './logo.svg';
import './App.css';
import Canvas from './Components/Canvas';
import Creature from './Data/Creature';
import { useState } from 'react';
import EditPanel from './Components/EditPanel';
import { parsePasteFromExcel } from './Utility/Parser';
import CardListPanel from './Components/CardListPanel';

function App() {

    //Card
    let card = new Creature();
    let setCard = (c) => { card = c; };
    const defaultCard = () => new Creature();
    [card, setCard] = useState(defaultCard);
    window.card = card;
    let updateCard = (oldcard) => {
        let newcard = JSON.parse(JSON.stringify(oldcard));
        Object.setPrototypeOf(newcard, Creature.prototype);
        setCard(newcard);
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
