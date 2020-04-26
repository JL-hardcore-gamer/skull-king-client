const SET_CLIENT = 'SET_CLIENT';
const SET_ROOMS = 'SET_ROOMS';
const SET_GAME_STATE = 'SET_GAME_STATE';
const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';
const SET_PLAYERS = 'SET_PLAYERS';
const ADD_ROUND = 'ADD_ROUND';

export const setClientAction = (client) => {
  return { type: SET_CLIENT, payload: client };
};

export const setRoomsAction = (rooms) => {
  return { type: SET_ROOMS, payload: rooms };
};

export const setGameStateAction = (newState) => {
  return { type: SET_GAME_STATE, payload: newState };
};

export const setCurrentRoom = (room) => {
  return { type: SET_CURRENT_ROOM, payload: room };
};

export const setPlayers = (players) => {
  return { type: SET_PLAYERS, payload: players };
};

export const addRoundAction = (newRound) => {
  return { type: ADD_ROUND, payload: newRound };
};

const defaultState = {
  client: null,
  rooms: [],
  state: {},
  currentRoom: null,
  players: [],
  rounds: [],
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case SET_GAME_STATE:
      return {
        ...state,
        state: action.payload,
      };
    case SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload,
      };
    case SET_PLAYERS:
      return {
        ...state,
        players: [...state.players, action.payload],
      };
    case ADD_ROUND:
      return {
        ...state,
        rounds: [...state.rounds, action.payload],
      };
    default:
      return state;
  }
}
