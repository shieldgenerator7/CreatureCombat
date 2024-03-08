"use strict";

function CardListPanel({ cardList, setCard }) {
    return (
        <div className="listPanel">
            {
                cardList.map(card => (
                    <div>
                        <button className="action" onClick={() => setCard(card)}>
                            {card.name || card.species}
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default CardListPanel;
