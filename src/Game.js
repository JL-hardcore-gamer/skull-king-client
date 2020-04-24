import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Card from './Card';
import { cardList } from './utils';

const Board = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 250px;
  margin: 0 10px;

  background-color: rgba(22, 22, 22, 0.2);
  border-radius: 5px;
`;

const PlayerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const PlayerData = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
`;

const PlayerCardContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const PlayerHandContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  margin: 10px;
`;

const GameStatusMessageContainer = styled.div`
  margin: 20px;
`;

const GameStatusMessage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
`;

const Game = () => {
  const currentRoom = useSelector((state) => state.game.currentRoom);
  const players = useSelector((state) => state.game.players);
  const [playerHand, setPlayerHand] = useState([]);

  useEffect(() => {
    // Setup the room
    console.log('currentRoom', currentRoom);
    if (currentRoom) {
      // currentRoom.state.game.remainingRounds[0].playersHand['MonPote'].hand[0]
      currentRoom.state.game.remainingRounds.onAdd = (round, i) => {
        console.log('round', round);
        console.log('i', i);

        // console.log('card', round.playersHand['MonPote'].hand[0]);
        // console.log('hands', );
        setPlayerHand(round.playersHand['MonPote'].hand);

        // Got the card
      };

      currentRoom.onMessage((message) => {
        console.log('message received from server');
        console.log(message);
      });
    }
  }, []);

  if (
    currentRoom &&
    currentRoom.state.game &&
    currentRoom.state.game.remainingRounds[0] &&
    currentRoom.state.game.remainingRounds[0].playersHand['MonPote'] &&
    currentRoom.state.game.remainingRounds[0].playersHand['MonPote'].hand[0]
  ) {
    console.log(
      'hand',
      currentRoom.state.game.remainingRounds[0].playersHand['MonPote'].hand[0]
    );
  }

  return (
    <div>
      <GameStatusMessageContainer>
        <GameStatusMessage>Pandora_Of_Oz joue une carte</GameStatusMessage>
      </GameStatusMessageContainer>

      <Board>
        <PlayerBoard>
          <PlayerHeader>
            <div>Ku Yong</div>
            <PlayerData>
              <div>100pt</div>
              <div>1/5</div>
            </PlayerData>
          </PlayerHeader>
          <PlayerCardContainer>
            <Card {...cardList[1]} />
          </PlayerCardContainer>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>Julien B79</PlayerHeader>
          <PlayerCardContainer>
            <Card {...cardList[2]} />
          </PlayerCardContainer>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>OnePiece78</PlayerHeader>
          <PlayerCardContainer>
            <Card {...cardList[3]} />
          </PlayerCardContainer>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>MonPote</PlayerHeader>
          <PlayerCardContainer>
            <Card {...cardList[8]} />
          </PlayerCardContainer>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>Pandora_Of_Oz</PlayerHeader>
          <PlayerCardContainer>
            <Card {...cardList[10]} />
          </PlayerCardContainer>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>Juliette</PlayerHeader>
          <PlayerCardContainer>
            <Card {...cardList[0]} />
          </PlayerCardContainer>
        </PlayerBoard>
      </Board>
      <PlayerHandContainer>
        {playerHand.map((card, idx) => {
          const cardData = cardList.find((c) => c.id === card.id);
          return (
            <CardContainer key={idx}>
              <Card {...cardData} />
            </CardContainer>
          );
        })}
      </PlayerHandContainer>
    </div>
  );
};

export default Game;
