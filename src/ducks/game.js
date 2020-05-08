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
const SET_PLAYERS_BET = 'SET_PLAYERS_BET';
const PLAYER_WON_TRICK = 'PLAYER_WON_TRICK';
const SET_SCORES = 'SET_SCORES';
const RESET_GAME = 'RESET_GAME';

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

export const setPlayersBetAction = (playersBet) => {
  return { type: SET_PLAYERS_BET, payload: playersBet };
};

export const playerWonTrickAction = (winnerId) => {
  return { type: PLAYER_WON_TRICK, payload: winnerId };
};

export const setScoresAction = (newScores) => {
  return { type: SET_SCORES, payload: newScores };
};

export const resetGameAction = () => {
  return { type: RESET_GAME };
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
  playersBet: [],
  scores: [],
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
    case SET_PLAYERS_BET:
      return {
        ...state,
        playersBet: action.payload,
      };

    case PLAYER_WON_TRICK:
      const winnerId = action.payload;
      let newPlayersBet = [...state.playersBet];
      let winnerIdx = newPlayersBet.findIndex((p) => p.playerId === winnerId);
      newPlayersBet[winnerIdx].tricksWon += 1;
      return {
        ...state,
        playersBet: newPlayersBet,
      };
    case SET_SCORES:
      return {
        ...state,
        scores: action.payload,
      };
    case RESET_GAME:
      return {
        ...state,
        currentRoom: null,
        players: [],
        playerHand: [],
        rounds: [],
        currentTrickPlayedCard: [],
        playersBet: [],
        scores: [],
      };
    default:
      return state;
  }
}
