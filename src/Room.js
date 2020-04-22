import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setRoomsAction, setPlayers } from './ducks/game';

const RoomContainer = styled.div``;
const PlayerList = styled.div``;

const Room = (props) => {
  const client = useSelector((state) => state.game.client);
  const dispatch = useDispatch();
  let { id } = useParams();
  const rooms = useSelector((state) => state.game.rooms);
  const gameState = useSelector((state) => state.game.state);
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
  }, []);

  // console.log('currentRoom', currentRoom.state);
  const deck = currentRoom.state.game.deck;
  console.log('deck', deck);
  console.log('players:', players);

  return (
    <RoomContainer className="card">
      <h5 className="card-header">Room</h5>

      <div className="card-body">
        <button className="btn btn-primary">Lancer la partie</button>
        <PlayerList>
          {players.map((player, idx) => {
            return (
              <div key={idx} className="card">
                Name: {player.name}
              </div>
            );
          })}
        </PlayerList>
      </div>
    </RoomContainer>
  );
};

export default Room;
