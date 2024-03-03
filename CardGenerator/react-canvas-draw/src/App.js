import logo from './logo.svg';
import './App.css';
import Canvas from './Components/Canvas';
import Creature from './Data/Creature';
import { useState } from 'react';

function App() {

  //Card
  let card = new Creature();
  let setCard = (c) => { card = c; };
  const defaultCard = () => new Creature();
  [card, setCard] = useState(defaultCard);
  window.card = card;

  return (
    <div className="App">
      <header className="App-header">
        <Canvas card={card}></Canvas>
      </header>
    </div>
  );
}

export default App;
