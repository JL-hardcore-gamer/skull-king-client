import React, { useEffect } from 'react';

import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Lobby from './Lobby';
import Room from './Room';

import { setUserAction } from './ducks/user';

import cardImg from './card.png';
import bgImg from './bg-img.jpg';
import { useDispatch } from 'react-redux';

const SingleCard = styled.img`
  object-fit: none;
  object-position: -1px 0px;
  width: 71px;
  height: 96px;
`;

// const cardsPos = [
//   {
//     cardId: '',
//     cardColor: 'Clumb',
//     posX: 0,
//     posY: 0,
//   },
// ];

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${bgImg});
  height: 100vh;
`;

const Content = styled.div`
  padding: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h2``;

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
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    const token = localStorage.getItem('token');

    if (nickname && token) {
      dispatch(setUserAction({ nickname, token }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Root>
        <NavBar />
        <Content>
          <TitleContainer>
            <Title>Skull King</Title>
          </TitleContainer>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/room/:id">
              <Room />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/">
              <Lobby />
            </Route>
          </Switch>
        </Content>
      </Root>
    </BrowserRouter>
  );
};

export default App;
