import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserAction, setUserServerCheckedAction } from './ducks/user';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const LoginForm = styled.div`
  width: 30rem;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SignIn = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    axios
      .post('http://localhost:2567/api/signin', {
        email,
      })
      .then((res) => {
        const data = res.data;
        localStorage.setItem('nickname', data.nickname);
        localStorage.setItem('token', data.token);

        dispatch(
          setUserAction({
            nickname: data.nickname,
            token: data.token,
          })
        );
        dispatch(setUserServerCheckedAction(true));
        history.push('/');
      });
  };

  return (
    <LoginContainer>
      <LoginForm className="card">
        <div className="card-header">Connexion à votre compte</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Email</span>
            </div>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <ActionContainer>
            <button className="btn btn-primary" onClick={() => onSubmit()}>
              Se connecter
            </button>
          </ActionContainer>
        </div>
      </LoginForm>
    </LoginContainer>
  );
};

export default SignIn;
