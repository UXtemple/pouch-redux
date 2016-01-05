import { LOGIN, LOGOUT } from './auth/actions';
import { LOAD, SET_READY, SET_SETTINGS, SET_SYNCING } from './actions';
import authReducer, { DEFAULT as AUTH_DEFAULT } from './auth/reducer';

const DEFAULT = {
  auth: AUTH_DEFAULT,
  isLoading: false,
  isReady: false,
  isSyncing: false
};

export default function pouchReducer(state=DEFAULT, action) {
  let nextState = state;

  switch (action.type) {
  case LOAD:
    if (action.sequence.type === 'start') {
      nextState = {
        ...state,
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
        auth: {
          isLoading: false,
          isReady: action.payload.isReady,
          user: action.payload.user
        },
        isLoading: false,
        isReady: true
      };
    }
    break;

  case LOGIN:
  case LOGOUT:
    nextState = {
      ...state,
      auth: authReducer(state.auth, action)
    };
    break;

  case SET_READY:
    nextState = {
      ...state,
      isReady: action.payload
    };
    break;

  case SET_SETTINGS:
    nextState = {
      ...state,
      ...action.payload
    };
    break;

  case SET_SYNCING:
    nextState = {
      ...state,
      isSyncing: action.payload
    };
    break;

  default: break;
  }

  return nextState;
}
