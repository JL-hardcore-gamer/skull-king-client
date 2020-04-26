import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Card, { CURSOR_NORMAL, CURSOR_CLICKABLE, CURSOR_DISABLE } from './Card';
import { cardList } from './utils';
import { addRoundAction } from './ducks/game';

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

const GameStateInfoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const GameStateInfo = styled.div`
  font-size: 30px;
`;

const GameStatusMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const GameStatusMessage = styled.div`
  display: flex;
  font-size: 20px;
`;

const GameBet = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
`;

const Game = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.data.nickname);
  const currentRoom = useSelector((state) => state.game.currentRoom);
  const players = useSelector((state) => state.game.players);
  const rounds = useSelector((state) => state.game.rounds);

  const [playerHand, setPlayerHand] = useState([]);
  const [allowedCards, setAllowedCards] = useState([]);
  const [startingPlayer, setStartingPlayer] = useState(null);
  const [firstPlayer, setFirstPlayer] = useState(null);
  // Should be set after a message
  const [currentRound, setCurrentRound] = useState(0);

  /**
   * FIXME Change to null after test
   */

  const [maxBet, setMaxBet] = useState(5);
  const [playerBet, setPlayerBet] = useState(1);

  const [gameMessage, setGameMessage] = useState(
    'Pandora_Of_Oz joue une carte'
  );

  useEffect(() => {
    if (rounds.length > 0) {
      setPlayerHand(rounds[currentRound].hand);
    }
  }, [currentRound, rounds]);

  useEffect(() => {
    // Setup the room

    if (currentRoom) {
      currentRoom.state.game.remainingRounds.onAdd = (round, key) => {
        const currentPlayer = players.find(
          (player) => player.name === userName
        );

        const newRound = {
          id: round.id,
          hand: round.playersHand[currentPlayer.id].hand,
        };

        dispatch(addRoundAction(newRound));
      };

      currentRoom.state.game.remainingRounds.onRemove = (round, i) => {
        // Do something
      };

      currentRoom.state.onChange = (changes) => {
        changes.forEach((change) => {
          const { field, value } = change;
          if (field === 'startingPlayer') {
            setStartingPlayer(value);
          }
          if (field === 'firstPlayer') {
            setFirstPlayer(value);
          }
        });
      };

      currentRoom.onMessage('START_BETTING', (message) => {
        setMaxBet(message.maxBet);
        console.log('message.maxBet', message.maxBet);
      });

      currentRoom.onMessage('GENERAL_MESSAGE', (message) => {
        setGameMessage(message);
      });
    } else {
      // Error the logic has not been implemented
    }
  }, [currentRoom, dispatch, players, userName]);

  const isCorrectBet =
    playerBet !== null &&
    maxBet != null &&
    playerBet >= 0 &&
    playerBet <= maxBet;

  return (
    <div>
      <GameStateInfoContainer>
        <GameStateInfo>Round 1</GameStateInfo>
      </GameStateInfoContainer>
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
            <Card {...cardList[1]} cursor={CURSOR_CLICKABLE} />
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
