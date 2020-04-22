import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import NavBar from './NavBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Lobby from './Lobby';
import Room from './Room';
import Game from './Game';
import { setUserAction, setUserServerCheckedAction } from './ducks/user';

import bgImg from './bg-img.jpg';
import { useDispatch, useSelector } from 'react-redux';

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

const PublicRoute = ({ component: Component, ...props }) => {
  const serverChecked = useSelector((state) => state.user.serverChecked);
  if (!serverChecked) {
    return <Route {...props} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/" />;
  }
};

const ProtectedRoute = ({ component: Component, ...props }) => {
  const serverChecked = useSelector((state) => state.user.serverChecked);
  if (serverChecked) {
    // The user is correct
    return <Route {...props} render={(props) => <Component {...props} />} />;
  } else if (serverChecked === null) {
    // We don't know if the user is correct
    return <div>Loading...</div>;
  } else {
    // The user is incorrect
    return <Redirect to="/signin" />;
  }
};

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
<<<<<<< HEAD
  const serverChecked = useSelector((state) => state.user.serverChecked);
=======
>>>>>>> 1a2720e3a102f06de9da6301ca8162dfa66a4ec3
  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    const token = localStorage.getItem('token');

    // Check if user correct
    if (nickname && token) {
      axios
        .post('http://localhost:2567/api/check-user', {
          nickname,
          token,
        })
        .then((res) => {
          const { nickname, token } = res.data;
          dispatch(
            setUserAction({
              nickname,
              token,
            })
          );
          dispatch(setUserServerCheckedAction(true));
        })
        .catch((e) => {
          dispatch(setUserAction(null));
          dispatch(setUserServerCheckedAction(false));
          localStorage.clear();
          history.push('/signin');
          console.log('error', e.response);
        });
    }
  }, [dispatch, history]);

  return (
    <Root>
      <NavBar />
      <Content>
        <TitleContainer>
          <Title>Skull King</Title>
        </TitleContainer>
        {serverChecked !== null ? (
          <Switch>
            <PublicRoute path="/signup" component={SignUp} />
            <PublicRoute path="/signin" component={SignIn} />
            <ProtectedRoute path="/room/:id" component={Room} />
            <ProtectedRoute path="/game" component={Game} />
            <ProtectedRoute path="/" component={Lobby} />
          </Switch>
        ) : null}
      </Content>
    </Root>
  );
};

export default App;
