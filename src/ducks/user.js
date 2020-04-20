const SET_USER = 'SET_USER';

export const setUserAction = (newUser) => {
  return { type: SET_USER, payload: newUser };
};

const defaultState = {
  data: null,
};

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
