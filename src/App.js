import React, { useEffect } from 'react';

import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Lobby from './Lobby';
import Room from './Room';
import Game from './Game';
import { setUserAction } from './ducks/user';

import bgImg from './bg-img.jpg';
import { useDispatch } from 'react-redux';

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
