"use strict";

import Creature from "../Data/Creature";
import { arraySum } from "../Utility/Utility";

function CardListPanel({ cardList, setCardList, currentCard, setCard, updateCard, setPasteString }) {
    return (
        <div className="leftPanel">
            {/* Deck Stats */}
            <div className="listInfo">
                <p> Creature List</p>
                <p> Count: {cardList.length}</p>
                <p> Total Cost: {arraySum(cardList, card => card.getFinalCost() * card.count)}</p>
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

                {/* Paste Box */}
                <div className='lowvisibilitylabel'>Paste Box</div>
                <textarea className="field multiline lowvisibility" onChange={(e) => {
                    //2024-03-03: setup to work with a specific Excel spreadsheet i have
                    let txt = e.target.value;
                    if (!txt) { return; }
                    console.log("TXT PASTE STRING ON CHANGE");
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
