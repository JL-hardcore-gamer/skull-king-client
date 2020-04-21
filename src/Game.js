import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import cardImg from './card.png';

const SingleCard = styled.img`
  object-fit: none;
  object-position: -1px 0px;
  width: 71px;
  height: 96px;
`;

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

const GeneratedCard = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  width: 100px;
  height: 130px;
  border-radius: 5px;
  border: 1px solid grey;
  background-color: ${({ bgColor }) => bgColor};
`;

const GeneratedCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
const CardNumber = styled.span`
  font-size: 30px;
`;

const CardContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Card = ({ color, code, name }) => {
  let cardColor = '#d44e26';
  switch (color) {
    case 'red':
      cardColor = '#f44336';
      break;
    case 'blue':
      cardColor = '#2196f3';
      break;
    case 'yellow':
      cardColor = '#ffeb3b';
      break;
    case 'black':
      cardColor = '#607d8b';
      break;
    case 'purple':
      cardColor = '#9c27b0';
      break;
    case 'pink':
      cardColor = '#e27b9e';
      break;
    case 'grey':
      cardColor = '#9e9e9e';
      break;
    case 'white':
      cardColor = 'white';
      break;
    case 'green':
      cardColor = '#4caf50';
      break;
    default:
      cardColor = '#607d8b';
  }

  let cardContent = null;
  if (typeof code === 'number') {
    cardContent = <CardNumber>{code}</CardNumber>;
  } else if (code === 'bloody-mary') {
    cardContent = (
      <div>
        <i className={`fas fa-skull-crossbones fa-2x`} />
        <span style={{ fontSize: '40px' }}>/</span>
        <i className={`fas fa-flag fa-2x`} />
      </div>
    );
  } else {
    cardContent = <i className={`fas ${code} fa-3x`} />;
  }

  return (
    <GeneratedCard bgColor={cardColor}>
      {name ? <CardTitle>{name}</CardTitle> : null}
      <CardContent>{cardContent}</CardContent>
    </GeneratedCard>
  );
};

const Game = () => {
  // const deck = [];
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const suits = ['red', 'blue', 'yellow', 'black'];
    const numericValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const specialValues = {
      'Skull King': 'purple',
      Mermaid: 'pink',
      Pirate: 'grey',
      'White Flag': 'white',
      'Bloody Mary': 'green',
    };
    const tmpDeck = [];
    suits.forEach((suit) => {
      numericValues.forEach((num) => {
        tmpDeck.push({ suit, num });
      });
    });

    const specialCards = [
      {
        suit: 'purple',
        num: 'fa-chess-king',
        name: 'Skull King',
      },
      {
        suit: 'pink',
        num: 'fa-fish',
        name: 'Mermaid',
      },
      {
        suit: 'grey',
        num: 'fa-skull-crossbones',
        name: 'Pirate',
      },
      {
        suit: 'white',
        num: 'fa-flag',
        name: 'Escape',
      },
      {
        suit: 'green',
        num: 'bloody-mary',
        name: 'Bloody Mary',
      },
    ];
    tmpDeck.push(...specialCards);

    setDeck(tmpDeck);
  }, []);

  console.log('deck', deck);

  return (
    <>
      <Board>
        <PlayerBoard>
          <PlayerHeader>Ku Yong</PlayerHeader>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>Julien B79</PlayerHeader>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>OnePiece78</PlayerHeader>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>MonPote</PlayerHeader>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>Kojima</PlayerHeader>
        </PlayerBoard>
        <PlayerBoard>
          <PlayerHeader>Juliette</PlayerHeader>
          <PlayerCardContainer>
            <SingleCard src={cardImg} alt="Icons" />
          </PlayerCardContainer>
        </PlayerBoard>
      </Board>
      <PlayerHandContainer>
        <CardContainer>
          <SingleCard src={cardImg} alt="Icons" />
        </CardContainer>
        <CardContainer>
          <SingleCard src={cardImg} alt="Icons" />
        </CardContainer>
        <CardContainer>
          <SingleCard src={cardImg} alt="Icons" />
        </CardContainer>
        <CardContainer>
          <SingleCard src={cardImg} alt="Icons" />
        </CardContainer>
        <CardContainer style={{ opacity: 0.5 }}>
          <SingleCard src={cardImg} alt="Icons" />
        </CardContainer>
      </PlayerHandContainer>
      <GeneratedCardContainer>
        {deck.map((card, idx) => (
          <CardContainer key={idx}>
            <Card color={card.suit} code={card.num} name={card.name} />
          </CardContainer>
        ))}
      </GeneratedCardContainer>
    </>
  );
};

export default Game;
