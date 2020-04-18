import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Sprite } from '@inlet/react-pixi';
import * as Colyseus from 'colyseus.js';

var client = new Colyseus.Client('ws://localhost:2567');

const App = () => {
  const [room, setRoom] = useState(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });
  useEffect(() => {
    console.log('skullking', client);

    client
      .create('skullking')
      .then((room) => {
        console.log('joined successfully', room);
        setRoom(room);
        room.send({ type: 'PLAY_CARD', test: 'toto' });
      })
      .catch((e) => {
        console.error('join error', e);
      });
  }, []);

  return (
    <Stage width={1600}>
      <Sprite
        image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/coin.png"
        // image="bunny.png"
        x={100}
        y={100}
        scale={scale}
        interactive={true}
        pointerdown={() => {
          setScale({ x: scale.x * 1.25, y: scale.y * 1.25 });
          console.log('click');
        }}
      />
    </Stage>
  );
};

export default App;
