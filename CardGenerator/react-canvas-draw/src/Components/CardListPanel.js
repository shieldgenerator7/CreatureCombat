"use strict";

import Creature from "../Data/Creature";
import { arraySum } from "../Utility/Utility";

function CardListPanel({ cardList, setCardList, currentCard, setCard }) {
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
                        let cardCount = card.count;
                        let className = "listItem" + ((card == currentCard) ? " select" : "");
                        return (
                            <div key={`divCard${i}`}>
                                <button className={className} onClick={() => setCard(card)}>
                                    <span>{cardName} ({cardCost})</span>
                                    <span>x{cardCount}</span>
                                </button>
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
