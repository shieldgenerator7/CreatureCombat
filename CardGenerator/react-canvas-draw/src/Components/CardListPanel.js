"use strict";

function CardListPanel({ cardList, setCard }) {
    return (
        <div className="leftPanel">
            {/* Deck Stats */}
            <div className="listInfo">
                <p> Creature List</p>
                <p> Count: {cardList.length}</p>
                <p> Total Cost: {cardList.sum(card => card.getFinalCost())}</p>
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
            </div>
        </div>
    );
}

export default CardListPanel;
