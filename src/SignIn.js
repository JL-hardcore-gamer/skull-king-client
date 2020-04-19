import React from 'react';
import styled from 'styled-components';

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

const SignIn = () => {
  return (
    <LoginContainer>
      <LoginForm className="card">
        <div className="card-header">Connexion à votre compte</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Email</span>
            </div>
            <input type="email" className="form-control" />
          </div>
          <ActionContainer>
            <button className="btn btn-primary">Se connecter</button>
          </ActionContainer>
        </div>
      </LoginForm>
    </LoginContainer>
  );
};

export default SignIn;
