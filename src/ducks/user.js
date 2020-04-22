const SET_USER = 'SET_USER';
const SET_USER_SERVER_CHECKED = 'SET_USER_SERVER_CHECKED';

export const setUserAction = (newUser) => {
  return { type: SET_USER, payload: newUser };
};

export const setUserServerCheckedAction = (serverChecked) => {
  return { type: SET_USER_SERVER_CHECKED, payload: serverChecked };
};

const defaultState = {
  data: null,
  serverChecked: false,
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.payload,
      };
    case SET_USER_SERVER_CHECKED:
      return {
        ...state,
        serverChecked: action.payload,
      };
    default:
      return state;
  }
}
