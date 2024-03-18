"use strict";

import Creature, { backwardsCompatifyCreature, inflateCreature } from "../Data/Creature";
import { UploadFromFilePicker } from "../Utility/Upload";
import { arraySort, arraySum } from "../Utility/Utility";

function CardListPanel({ cardList, setCardList, currentCard, setCard, updateCard, setPasteString }) {
    return (
        <div className="leftPanel">
            {/* Deck Stats */}
            <div className="listInfo">
                <p> Creature List</p>
                <p> Count: {cardList.length}</p>
                <p> Total Cost: {arraySum(cardList, card => card.getFinalCost() * card.count)}</p>
                <p> Sort:
                    <select onChange={(e) => {
                        let value = e.target.value;
                        let mf = (a) => a;//"map func"
                        let mfname = (a) => a.name || a.species || "[creature]";
                        let mfcost = (a) => a.getFinalCost();
                        let mfstars = (a) => a.getStarCount();
                        let mfpowerbase = (a) => a.basePower;
                        let mfcount = (a) => a.count;
                        let mfdatecreation = (a) => a.creationDate;
                        switch (value) {
                            case "name": mf = mfname; break;
                            case "cost": mf = mfcost; break;
                            case "stars": mf = mfstars; break;
                            case "power_base": mf = mfpowerbase; break;
                            case "count": mf = mfcount; break;
                            case "date_creation": mf = mfdatecreation; break;
                        }
                        let reverseList = [
                            "count",
                            "date_creation",
                        ]
                        arraySort(cardList, mf, !reverseList.includes(value));
                        setCardList([...cardList]);
                    }}>
                        <option value="name">Name (or Species)</option>
                        <option value="cost">Cost</option>
                        <option value="stars">Stars</option>
                        <option value="power_base">Base Power</option>
                        <option value="count">Count</option>
                        <option value="date_creation">Creation Date</option>
                    </select>
                </p>
            </div>
            {/* Card List */}
            <div className="list">
                {
                    cardList.map((card, i) => {
                        let cardName = card.name || card.species || "[creature]";
                        let cardCost = card.getFinalCost();
                        cardCost += (cardCost != 1) ? "pts" : "pt";
                        let className = "listItem" + ((card == currentCard) ? " select" : "");
                        let countClassName = (card == currentCard) ? "select" : "";
                        return (
                            <div key={`divCard${i}`}
                                className={className} onClick={() => setCard(card)}
                            >
                                <span>{cardName} ({cardCost})</span>
                                <button className={countClassName}
                                    onClick={e => {
                                        card.count++;
                                        updateCard(card);
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onContextMenu={e => {
                                        card.count = Math.max(0, card.count - 1);
                                        updateCard(card);
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                >x{card.count}</button>
                            </div>
                        );
                    })
                }
                <div key="divCardNew">
                    <button className="action listAction" onClick={() => {
                        let newcard = new Creature();
                        setCard(newcard);
                        cardList.push(newcard);
                        setCardList([...cardList]);
                    }}>
                        Add New Card
                    </button>
                </div>
                <div>
                    <button className="action listAction" onClick={() => {
                        UploadFromFilePicker(".card", true, (json) => {
                            let card = JSON.parse(decodeURIComponent(json));
                            inflateCreature(card);
                            backwardsCompatifyCreature(card);
                            cardList.push(card);
                            setCardList([...cardList]);
                            setCard(card);
                        });
                    }}>Upload .card File</button>
                </div>

                {/* Paste Box */}
                <div className='lowvisibilitylabel'>Paste Box</div>
                <textarea className="field multiline lowvisibility" onChange={(e) => {
                    //2024-03-03: setup to work with a specific Excel spreadsheet i have
                    let txt = e.target.value;
                    if (!txt) { return; }
                    setPasteString(txt);
                }}
                    rows="2"
                    placeholder="Paste here from spreadsheet"
                    value={""}
                ></textarea>
            </div>
        </div>
    );
}

export default CardListPanel;
