import lookup from './lookup';
import getKey from './get-key';

export const LOAD = 'pouch-redux/LOAD';
export function load() {
  return function loadThunk(dispatch, getState) {
    const { pouch } = getState();

    const payload = lookup.get(getKey(pouch))
      .then(doc => ({isReady: true, user: doc.user}))
      .catch(() => ({isReady: false}));

    dispatch({
      type: LOAD,
      payload
    });
  }
}

export const SET_READY = 'pouch-redux/SET_READY';
export function setReady(isReady) {
  return {
    type: SET_READY,
    payload: isReady
  };
}

export const SET_SETTINGS = 'pouch-redux/SET_SETTINGS';
export function setSettings({local, remote}) {
  return {
    type: SET_SETTINGS,
    payload: {
      local,
      remote
    }
  };
}
