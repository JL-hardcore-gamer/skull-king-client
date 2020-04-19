import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';

const LobbyContainer = styled.div``;

const RoomList = styled.div`
  display: flex;
`;

const RoomContainer = styled.div`
  margin: 0 10px;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Lobby = (props) => {
  const { client } = props;
  const [availableRooms, setRooms] = useState([]);

  useEffect(() => {
    console.log('Lobby');
    client
      .getAvailableRooms('SkullKing')
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  console.log('availableRooms', availableRooms);

  console.log('props', props);

  return (
    <LobbyContainer className="card">
      <h5 class="card-header">Lobby</h5>
      <div className="card-body">
        <ActionContainer>
          <button type="button" className="btn btn-primary">
            Créer une table
          </button>
        </ActionContainer>

        <RoomList>
          {availableRooms.map((room, idx) => {
            const date = moment(room.createdAt).format('DD/MM/YY HH:mm:ss');
            return (
              <RoomContainer
                key={idx}
                className="card"
                style={{ width: '18rem' }}
              >
                <div className="card-body">
                  <h5 className="card-title">Skull King</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
                  <ActionContainer>
                    <button type="button" className="btn btn-primary">
                      Rejoindre
                    </button>
                  </ActionContainer>
                </div>
              </RoomContainer>
            );
          })}
        </RoomList>
      </div>
    </LobbyContainer>
  );
};

export default Lobby;
