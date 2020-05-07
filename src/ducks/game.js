const SET_CLIENT = 'SET_CLIENT';
const SET_ROOMS = 'SET_ROOMS';
const SET_GAME_STATE = 'SET_GAME_STATE';
const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';
const SET_PLAYERS = 'SET_PLAYERS';
const ADD_ROUND = 'ADD_ROUND';
const ADD_PLAYED_CARD = 'ADD_PLAYED_CARD';
const CLEAR_PLAYED_CARD = 'CLEAR_PLAYED_CARD';
const SET_PLAYER_HAND = 'SET_PLAYER_HAND';
const REMOVE_CARD_FROM_PLAYER_HAND = 'REMOVE_CARD_FROM_PLAYER_HAND';

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

export const addPlayedCardAction = (newPlayedCard) => {
  return { type: ADD_PLAYED_CARD, payload: newPlayedCard };
};

export const clearPlayedCardAction = () => {
  return { type: CLEAR_PLAYED_CARD };
};

export const setPlayerHandAction = (playerHand) => {
  return { type: SET_PLAYER_HAND, payload: playerHand };
};

export const removeCardFromPlayerHandAction = (cardIdx) => {
  return { type: REMOVE_CARD_FROM_PLAYER_HAND, payload: cardIdx };
};

const defaultState = {
  client: null,
  rooms: [],
  state: {},
  currentRoom: null,
  players: [],
  playerHand: [],
  rounds: [],
  currentTrickPlayedCard: [],
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
    case ADD_PLAYED_CARD:
      return {
        ...state,
        currentTrickPlayedCard: [
          ...state.currentTrickPlayedCard,
          action.payload,
        ],
      };
    case CLEAR_PLAYED_CARD:
      return {
        ...state,
        currentTrickPlayedCard: [],
      };
    case SET_PLAYER_HAND:
      return {
        ...state,
        playerHand: action.payload,
      };
    case REMOVE_CARD_FROM_PLAYER_HAND:
      return {
        ...state,
        playerHand: state.playerHand.filter(
          (card) => card.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
