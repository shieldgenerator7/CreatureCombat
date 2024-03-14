"use strict";

import Creature from "../Data/Creature";
import { arraySum } from "../Utility/Utility";

function CardListPanel({ cardList, setCardList, currentCard, setCard, updateCard }) {
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
            </div>
        </div>
    );
}

export default CardListPanel;
