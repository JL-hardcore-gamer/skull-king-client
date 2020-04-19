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

const Signup = () => {
  return (
    <LoginContainer>
      <LoginForm className="card">
        <div className="card-header">Création d'un compte</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Email</span>
            </div>
            <input type="email" className="form-control" />
            <small id="emailHelp" class="form-text text-muted">
              C'est juste pour générer un compte, on ne vous enverra pas de
              mail.
            </small>
          </div>
          <div className="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Pseudo</span>
            </div>
            <input type="text" className="form-control" />
          </div>
          <ActionContainer>
            <button className="btn btn-primary">Créer un compte</button>
          </ActionContainer>
        </div>
      </LoginForm>
    </LoginContainer>
  );
};

export default Signup;
