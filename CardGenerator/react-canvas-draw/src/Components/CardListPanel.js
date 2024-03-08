"use strict";

function CardListPanel({ cardList, setCard }) {
    return (
        <div>
            {
                cardList.map(card => (
                    <div>
                        <button onClick={() => setCard(card)}>
                            {card.name || card.species}
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default CardListPanel;
