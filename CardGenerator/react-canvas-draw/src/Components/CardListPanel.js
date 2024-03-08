"use strict";

import Creature from "../Data/Creature";
import { arraySum } from "../Utility/Utility";

function CardListPanel({ cardList, setCardList, setCard }) {
    return (
        <div className="leftPanel">
            {/* Deck Stats */}
            <div className="listInfo">
                <p> Creature List</p>
                <p> Count: {cardList.length}</p>
                <p> Total Cost: {arraySum(cardList, card => card.getFinalCost())}</p>
            </div>
            {/* Card List */}
            <div className="list">
                {
                    cardList.map(card => (
                        <div>
                            <button className="listItem" onClick={() => setCard(card)}>
                                {card.name || card.species || "[creature]"} - {card.getFinalCost()}
                            </button>
                        </div>
                    ))
                }
                <div>
                    <button className="action" onClick={() => {
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
