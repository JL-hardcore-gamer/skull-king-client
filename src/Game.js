import React, { useEffect } from 'react';
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
  width: 150px;
  height: 200px;
  margin: 0 10px;

  background-color: rgba(22, 22, 22, 0.2);
  border-radius: 5px;
`;

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
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

const Game = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Board>
        <PlayerBoard>
          <PlayerHeader>Ku Yong</PlayerHeader>
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
          <PlayerHeader>Kojima</PlayerHeader>
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
        <CardContainer>
          <Card {...cardList[12]} />
        </CardContainer>
        <CardContainer>
          <Card {...cardList[34]} />
        </CardContainer>
        <CardContainer>
          <Card {...cardList[23]} />
        </CardContainer>
        <CardContainer>
          <Card {...cardList[56]} />
        </CardContainer>
        <CardContainer style={{ opacity: 0.5 }}>
          <Card {...cardList[60]} />
        </CardContainer>
      </PlayerHandContainer>
    </>
  );
};

export default Game;
