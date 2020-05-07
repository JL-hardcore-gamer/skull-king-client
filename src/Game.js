import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

import Card, { CURSOR_NORMAL, CURSOR_CLICKABLE, CURSOR_DISABLE } from './Card';
import { cardList } from './utils';
import {
  addRoundAction,
  addPlayedCardAction,
  clearPlayedCardAction,
  setPlayerHandAction,
  removeCardFromPlayerHandAction,
  setPlayersBetAction,
  playerWonTrickAction,
} from './ducks/game';

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

const BloodyMaryChoice = styled.div`
  display: flex;
  justify-content: center;
`;

const Game = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.data.nickname);
  const currentRoom = useSelector((state) => state.game.currentRoom);
  const players = useSelector((state) => state.game.players);
  const rounds = useSelector((state) => state.game.rounds);

  const [showBloodyMary, setShowBloodyMary] = useState(false);

  const handleClose = () => setShowBloodyMary(false);
  const handleShow = () => setShowBloodyMary(true);

  const playerHand = useSelector((state) => state.game.playerHand);
  // Should be set after a message
  const [currentRound, setCurrentRound] = useState(0);
  const [currentPlayerId, setCurrentPlayerId] = useState(-1);
  const [bloodyMary, setBloodyMary] = useState(null);
  const [isRoundStarted, setIsRoundStarted] = useState(false);

  const playersPlayedCard = useSelector(
    (state) => state.game.currentTrickPlayedCard
  );

  const playersBet = useSelector((state) => state.game.playersBet);
  /**
   * FIXME Change to null after test
   */

  const [maxBet, setMaxBet] = useState(-1);
  const [playerBet, setPlayerBet] = useState(1);

  const [gameMessage, setGameMessage] = useState(
    'Pandora_Of_Oz joue une carte'
  );

  useEffect(() => {
    console.log('=== RESET === ');
    if (rounds.length > 0) {
      dispatch(setPlayerHandAction(rounds[currentRound].hand));
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

      currentRoom.state.currentTrick.onChange = (changes) => {
        changes.forEach((change) => {
          const { field, value } = change;
          if (field === 'currentPlayer') {
            setCurrentPlayerId(value);
          }
          if (field === 'bloodyMary') {
            setBloodyMary(value);
          }
        });

        currentRoom.state.currentTrick.cardsPlayed.onAdd = (
          cardPlayed,
          key
        ) => {
          dispatch(
            addPlayedCardAction({
              playedId: parseInt(key),
              cardPlayedId: cardPlayed.id,
            })
          );
        };

        currentRoom.state.currentTrick.cardsPlayed.onChange = (
          cardPlayed,
          key
        ) => {
          dispatch(
            addPlayedCardAction({
              playedId: parseInt(key),
              cardPlayedId: cardPlayed.id,
            })
          );
        };

        currentRoom.state.game.scoreboard.onAdd = (score, key) => {
          console.log('onAdd score', score);
          console.log('onAdd key', key);
        };

        currentRoom.state.game.scoreboard.onChange = (score, key) => {
          console.log('onChange score', score);
          console.log('onChange key', key);
        };
      };

      currentRoom.onMessage('TOP_MESSAGE', (message) => {
        setGameMessage(message);
      });

      currentRoom.onMessage('START_BETTING', (message) => {
        setMaxBet(message.maxBet);
        setGameMessage(message.topMessage);
        setCurrentRound(message.maxBet - 1);
        dispatch(clearPlayedCardAction());
        setIsRoundStarted(false);
        setBloodyMary(null);
      });

      currentRoom.onMessage('START_ROUND', (message) => {
        console.log('START_ROUND', message);
        setIsRoundStarted(true);
        dispatch(
          setPlayersBetAction(
            message.playersBet.map((bet) => ({
              playerId: parseInt(bet.playerId),
              bet: bet.bet,
              tricksWon: 0,
            }))
          )
        );
      });

      currentRoom.onMessage('CARD_VALIDATED', (message) => {
        dispatch(removeCardFromPlayerHandAction(message.value));
      });

      currentRoom.onMessage('NEXT_TRICK', (message) => {
        dispatch(clearPlayedCardAction());
        setBloodyMary(null);
      });

      currentRoom.onMessage('TRICK_WINNER', (message) => {
        console.log('TRICK_WINNER', message);
        const winnerId = message.value;
        dispatch(playerWonTrickAction(winnerId));
      });

      currentRoom.onMessage('GAME_OVER', (message) => {
        console.log('GAME_OVER', message);
        // FIXME Do Something
      });
    } else {
      // Error the logic has not been implemented
    }
  }, [currentRoom, dispatch, playerHand, players, playersPlayedCard, userName]);

  const isCorrectBet =
    playerBet !== null &&
    maxBet != null &&
    playerBet >= 0 &&
    playerBet <= maxBet;

  const currentPlayer = players.find((player) => player.id === currentPlayerId);
  const isCurrentPlayer =
    currentPlayer && userName && currentPlayer.name === userName;

  return (
    <div>
      <GameStateInfoContainer>
        <GameStateInfo>Round {currentRound + 1}</GameStateInfo>
      </GameStateInfoContainer>
      {gameMessage !== null ? (
        <GameStatusMessageContainer>
          <GameStatusMessage>{gameMessage}</GameStatusMessage>
        </GameStatusMessageContainer>
      ) : null}

      {maxBet !== -1 ? (
        <GameStatusMessageContainer>
          <GameBet className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Nombre de plis</span>
            </div>
            <input
              type="number"
              className="form-control"
              min="0"
              max={maxBet}
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
                  setMaxBet(-1);
                }}
              >
                Prêt à Yo-Ho-Ho
              </button>
            </div>
          </GameBet>
        </GameStatusMessageContainer>
      ) : null}

      <Board>
        {players.map((player, idx) => {
          const isCurrentPlayer = currentPlayerId === player.id;
          const playerCard = playersPlayedCard.find(
            (card) => card.playedId === player.id
          );

          let cardId = playerCard && playerCard.cardPlayedId;
          if (cardId === 65 && bloodyMary === 'pirate') {
            cardId = 66;
          } else if (cardId === 65 && bloodyMary === 'escape') {
            cardId = 67;
          }

          const playerBet = playersBet.find(
            (bet) => bet.playerId === player.id
          );

          return (
            <PlayerBoard key={idx}>
              <PlayerHeader>
                <div style={{ color: isCurrentPlayer ? 'red' : 'blue' }}>
                  {player.name}
                </div>
                <PlayerData>
                  <div>100pt</div>
                  <div>
                    {' '}
                    {playerBet
                      ? `Bet: ${playerBet.tricksWon}/${playerBet.bet}`
                      : ''}
                  </div>
                </PlayerData>
              </PlayerHeader>
              <PlayerCardContainer>
                {playerCard ? (
                  <Card {...cardList[cardId]} cursor={CURSOR_NORMAL} />
                ) : null}
              </PlayerCardContainer>
            </PlayerBoard>
          );
        })}
      </Board>
      <PlayerHandContainer>
        {playerHand.map((card, idx) => {
          const cardData = cardList.find((c) => c.id === card.id);
          return (
            <CardContainer
              key={idx}
              onClick={() => {
                if (isRoundStarted && isCurrentPlayer) {
                  if (card.id === 65) {
                    handleShow();
                  } else {
                    currentRoom.send('PLAY_CARD', { value: cardData.id });
                  }
                }
              }}
            >
              <Card cursor={CURSOR_CLICKABLE} {...cardData} />
            </CardContainer>
          );
        })}
      </PlayerHandContainer>
      <Modal show={showBloodyMary} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bloody Mary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}>
            Woohoo, tu es plutôt{' '}
            <i className={`fas fa-skull-crossbones fa-lg`} /> ou{' '}
            <i className={`fas fa-flag fa-lg`} /> ?
          </div>

          <BloodyMaryChoice>
            <CardContainer
              onClick={() => {
                if (currentRoom) {
                  currentRoom.send('PLAY_CARD', {
                    value: 65,
                    bloodyMaryChoice: 'pirate',
                  });
                }
                handleClose();
              }}
            >
              <Card cursor={CURSOR_CLICKABLE} {...cardList[66]} />
            </CardContainer>
            <CardContainer
              onClick={() => {
                if (currentRoom) {
                  currentRoom.send('PLAY_CARD', {
                    value: 65,
                    bloodyMaryChoice: 'escape',
                  });
                }
                handleClose();
              }}
            >
              <Card cursor={CURSOR_CLICKABLE} {...cardList[67]} />
            </CardContainer>
          </BloodyMaryChoice>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Game;
