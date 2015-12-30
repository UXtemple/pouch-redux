import { LOGIN, LOGOUT } from './actions';

export const DEFAULT = {
  isLoading: false,
  isReady: false
};

export default function pouchAuthReducer(state=DEFAULT, action) {
  let nextState = state;

  switch (action.type) {
  case LOGIN:
    if (action.sequence.type === 'start') {
      nextState = {
        ...state,
        user: action.meta.user,
        isLoading: true,
        isReady: false
      };
    } else if (action.error) {
      nextState = {
        ...state,
        error: true,
        isLoading: false,
        isReady: false,
        message: action.payload
      };
    } else {
      nextState = {
        ...state,
        ...action.payload.userCtx,
        isLoading: false,
        isReady: true
      };
    }
    break;

  case LOGOUT:
    if (action.sequence.type === 'next' && !action.error) {
      nextState = DEFAULT;
    }
    break;

  default: break;
  }

  return nextState;
}
