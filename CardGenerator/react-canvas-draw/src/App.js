import logo from './logo.svg';
import './App.css';
import Canvas from './Components/Canvas';
import Creature from './Data/Creature';
import { useState } from 'react';
import EditPanel from './Components/EditPanel';
import { parsePasteFromExcel } from './Utility/Parser';

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
    //Card List
    let cardList = [];
    if (pasteString) {
        cardList = parsePasteFromExcel(pasteString);
        if (cardList.length < 1) {
            cardList.push(new Creature());
        }
        window.cardList = cardList;
        setPasteString("");
        //
        card = cardList[0];
    }
    //

    return (
        <div className="App">
            <header className="App-header">
                <Canvas card={card}></Canvas>
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
