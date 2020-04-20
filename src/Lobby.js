import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGameStateAction,
  setRoomsAction,
  setCurrentRoom,
  setPlayers,
} from './ducks/game';

const LobbyContainer = styled.div``;

const RoomList = styled.div`
  display: flex;
`;

const RoomContainer = styled.div`
  margin: 0 10px;
  width: 18rem;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Lobby = (props) => {
  const client = useSelector((state) => state.game.client);
  const rooms = useSelector((state) => state.game.rooms);
  const user = useSelector((state) => state.user.data);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .getAvailableRooms('SkullKing')
      .then((rooms) => {
        dispatch(setRoomsAction(rooms));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const createRoom = () => {
    client
      .create('SkullKing', {
        nickname: user.nickname,
        token: user.token,
      })
      .then((room) => {
        room.state.players.onAdd = (player, i) => {
          dispatch(setPlayers(player));
        };

        dispatch(setCurrentRoom(room));

        history.push(`/room/${room.id}`);
      })
      .catch((e) => {
        console.error('creation or join error', e);
      });
  };

  const joinRoom = (roomId) => {
    client
      .joinById(roomId, {
        nickname: user.nickname,
        token: user.token,
      })
      .then((room) => {
        room.state.players.onAdd = (player, i) => {
          dispatch(setPlayers(player));
        };

        dispatch(setCurrentRoom(room));
        history.push(`/room/${room.id}`);
      })
      .catch((e) => {
        console.error('join error', e);
      });
  };

  return (
    <LobbyContainer className="card">
      <h5 className="card-header">Lobby</h5>
      <div className="card-body">
        <ActionContainer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => createRoom()}
          >
            Créer une table
          </button>
        </ActionContainer>

        <RoomList>
          {rooms.map((room, idx) => {
            const date = moment(room.createdAt).format('DD/MM/YY HH:mm:ss');
            return (
              <RoomContainer key={idx} className="card">
                <div className="card-body">
                  <h5 className="card-title">Skull King - {room.roomId}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
                  <ActionContainer>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => joinRoom(room.roomId)}
                    >
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
