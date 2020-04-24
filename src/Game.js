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
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const GameStatusMessage = styled.div`
  display: flex;
  /* justify-content: center; */
  font-size: 30px;
`;

const GameBet = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
`;

const Game = () => {
  const currentRoom = useSelector((state) => state.game.currentRoom);
  const players = useSelector((state) => state.game.players);
  const [playerHand, setPlayerHand] = useState([]);

  /**
   * FIXME Change to null after test
   */

  const [maxBet, setMaxBet] = useState(5);
  const [playerBet, setPlayerBet] = useState(1);

  const [gameMessage, setGameMessage] = useState(
    'Pandora_Of_Oz joue une carte'
  );

  useEffect(() => {
    // Setup the room
    console.log('currentRoom', currentRoom);
    if (currentRoom) {
      currentRoom.state.game.remainingRounds.onAdd = (round, i) => {
        // FIXME to improve
        console.log('round', round);
        console.log('i', i);

        setPlayerHand(round.playersHand['MonPote'].hand);
      };

      currentRoom.state.game.remainingRounds.onRemove = (round, i) => {
        // Do something
      };

      currentRoom.onMessage('START_BETTING', (message) => {
        setMaxBet(message.maxBet);
      });

      currentRoom.onMessage('GENERAL_MESSAGE', (message) => {
        setGameMessage(message);
      });
    } else {
      // Error the logic has not been implemented
    }
  }, []);

  const isCorrectBet =
    playerBet !== null &&
    maxBet != null &&
    playerBet >= 0 &&
    playerBet <= maxBet;

  return (
    <div>
      {gameMessage !== null ? (
        <GameStatusMessageContainer>
          <GameStatusMessage>{gameMessage}</GameStatusMessage>
        </GameStatusMessageContainer>
      ) : null}

      {maxBet !== null ? (
        <GameStatusMessageContainer>
          <GameBet className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Nombre de plis</span>
            </div>
            <input
              type="number"
              className="form-control"
              min="0"
              max="5"
              onChange={(e) => {
                setPlayerBet(parseInt(e.target.value));
              }}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isCorrectBet}
                onClick={() => {
                  currentRoom.send('BET', { value: playerBet });
                }}
              >
                Prêt à Yo-Ho-Ho
              </button>
            </div>
          </GameBet>
        </GameStatusMessageContainer>
      ) : null}

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
