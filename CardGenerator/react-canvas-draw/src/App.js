import logo from './logo.png';
import './App.css';
import React, {  useEffect , useState} from 'react';
import Canvas from './Components/Canvas';
import Creature, { inflateCreature } from './Data/Creature';
import EditPanel from './Components/EditPanel';
import { parsePasteFromExcel } from './Utility/Parser';
import CardListPanel from './Components/CardListPanel';
import Storage from './Utility/Storage';
import { VERSION } from './Version';
import { isImage } from './Utility/Utility';

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
        if (isImage(oldcard.imgPortrait)) {
            newcard.imgPortrait = oldcard.imgPortrait;
        }
        inflateCreature(
            newcard,
            (c) => { if (c == card) { updateCard(c); } }
        );
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
        window.cardList = cardList;
    };
    const defaultCardList = () => (storage.cardList.length > 0) ? storage.cardList : [card];
    [cardList, setCardList] = useState(defaultCardList);
    window.cardList = cardList;
    //
    if (pasteString) {
        let oldList = cardList;
        cardList = parsePasteFromExcel(pasteString);
        cardList.splice(0, 0, ...oldList);
        if (cardList.length < 1) {
            cardList.push(new Creature());
        }
        window.cardList = cardList;
        //
        setAutoDownload(true);
        autoDownload = true;
        for (let i = 0; i < cardList.length; i++) {
            setCard(cardList[i]);
        }
        setCardList([...cardList]);
        setAutoDownload(false);
        setPasteString("");
    }
    //

    useEffect(() => {
        let cardName = card?.getNameText(true, false);
        document.title = ((cardName) ? `${cardName} - ` : "") + `Creature Combat v${VERSION}`;
    }, [card, cardList]);

    return (
        <div className="App">
            <header className="App-header">
                <CardListPanel
                    cardList={cardList}
                    setCardList={setCardList}
                    currentCard={card}
                    setCard={setCard}
                    updateCard={updateCard}
                    setPasteString={setPasteString}
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
