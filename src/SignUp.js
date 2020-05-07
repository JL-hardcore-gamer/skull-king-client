import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { API } from './config';
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

const Signup = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const onSubmit = () => {
    axios
      .post(`${API}/api/signup`, {
        email,
        nickname,
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

  console.log('process.env', process.env);

  return (
    <LoginContainer>
      <LoginForm className="card">
        <div className="card-header">Création d'un compte</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Email</span>
            </div>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              C'est juste pour générer un compte, on ne vous enverra pas
              d'email.
            </small>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Pseudo</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <ActionContainer>
            <button className="btn btn-primary" onClick={() => onSubmit()}>
              Créer un compte
            </button>
          </ActionContainer>
        </div>
      </LoginForm>
    </LoginContainer>
  );
};

export default Signup;
