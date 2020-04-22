import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setRoomsAction } from './ducks/game';

const RoomContainer = styled.div``;
const RoomHeader = styled.h5`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PlayerList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
  margin: 0 10px 10px 0;
`;

const PlayerIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border: solid 1px black;
  border-radius: 20px;
  margin: 10px;
`;

const Room = (props) => {
  const client = useSelector((state) => state.game.client);
  const dispatch = useDispatch();
  // let { id } = useParams();
  // const rooms = useSelector((state) => state.game.rooms);
  // const gameState = useSelector((state) => state.game.state);
  // const currentRoom = rooms.find(room => )
  const currentRoom = useSelector((state) => state.game.currentRoom);
  const players = useSelector((state) => state.game.players);

  useEffect(() => {
    client
      .getAvailableRooms('SkullKing')
      .then((rooms) => {
        dispatch(setRoomsAction(rooms));
      })
      .catch((e) => {
        console.error(e);
      });
  }, [client, dispatch]);

  // console.log('currentRoom', currentRoom.state);
  // const deck = currentRoom.state.game.deck;
  // console.log('deck', deck);
  // console.log('players:', players);

  return (
    <RoomContainer className="card">
      <RoomHeader className="card-header">
        <div>Room</div>
        <ActionContainer>
          <button
            className="btn btn-primary"
            disabled={players.length <= 2}
            onClick={() => {
              currentRoom.send({ type: 'START_GAME' });
            }}
          >
            Lancer la partie
          </button>
        </ActionContainer>
      </RoomHeader>

      <div className="card-body">
        <PlayerList>
          {players.map((player, idx) => {
            return (
              <PlayerInfo key={idx} className="card">
                <PlayerIcon>
                  <i className="fas fa-dice-one fa-lg" />
                </PlayerIcon>
                Name: {player.name}
              </PlayerInfo>
            );
          })}
        </PlayerList>
      </div>
    </RoomContainer>
  );
};

export default Room;
