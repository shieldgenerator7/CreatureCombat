"use strict";

function CardListPanel({ cardList, setCard }) {
    return
    (
        <div>
            {
                cardList.forEach(card => {
                    return (

                        <div>
                            <button onClick={() => setCard(card)}>{ card.name}</button>
                        </div>

                    )
                })
            }
        </div>
    );
}

export default CardListPanel;
