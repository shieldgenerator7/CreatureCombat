import logo from './logo.svg';
import './App.css';
import Canvas from './Components/Canvas';
import Creature from './Data/Creature';
import { useState } from 'react';
import EditPanel from './Components/EditPanel';

function App() {

  //Card
  let card = new Creature();
  let setCard = (c) => { card = c; };
  const defaultCard = () => new Creature();
  [card, setCard] = useState(defaultCard);
  window.card = card;
  let updateCard = (oldcard) => {
    let newcard = JSON.parse(JSON.stringify(oldcard));
    Object.setPrototypeOf(newcard, Creature.prototype);
    setCard(newcard);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Canvas card={card}></Canvas>
        <EditPanel card={card} setCard={setCard} updateCard={updateCard}></EditPanel>
      </header>
    </div>
  );
}

export default App;
