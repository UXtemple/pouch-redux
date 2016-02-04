import * as adapter from './adapter';
import getKey from '../get-key';
import getPouch from '../get-pouch';
import lookup from '../lookup';
import PouchDB from 'pouchdb';

function makeSurePouchReduxIsMountedOnStore(pouch) {
  if (!(pouch && pouch.remote && pouch.remote.name)) {
    throw "We need pouch.remote.name in the redux store. Did you mount pouch-redux's reducer?";
  }
}

// TODO review as this is kind of hacky but it does the trick
// we essentially need to make sure the remote db exists right after the user logged in so
// that we can sync back to it
function makeSureRemoteExists(pouch) {
  new PouchDB(pouch.remote.name);
}

export const LOGIN = 'pouch-redux/auth/LOGIN';
export function login({user, password}) {
  return function loginThunk(dispatch, getState) {
    const { pouch } = getState();
    makeSurePouchReduxIsMountedOnStore(pouch);

    const payload = adapter.login(pouch.remote.name, user, password);

    payload
      .then(() => lookup.put({
        _id: getKey(pouch),
        user
      }))
      .then(() => makeSureRemoteExists(pouch));

    dispatch({
      type: LOGIN,
      payload,
      meta: {
        user
      }
    });
  }
}

export const LOGOUT = 'pouch-redux/auth/LOGOUT';
export function logout() {
  return function logoutThunk(dispatch, getState) {
    const { pouch } = getState();
    makeSurePouchReduxIsMountedOnStore(pouch);

    const payload = adapter.logout(pouch.remote.name);
    const key = getKey(pouch);
    payload
      .then(() => lookup.get(key))
      .then(doc => lookup.remove(doc))
      .then(() => getPouch(pouch).db.destroy());

    dispatch({
      type: LOGOUT,
      payload
    });
  }
}

export const SIGNUP = 'pouch-redux/auth/SIGNUP';
export function signup({user, password, ...extra}) {
  return function signupThunk(dispatch, getState) {
    const { pouch } = getState();
    makeSurePouchReduxIsMountedOnStore(pouch);

    const payload = adapter.signup(pouch.remote.name, user, password, extra);

    payload
      .then(() => lookup.put({
        _id: getKey(pouch),
        user
      }))
      .then(() => makeSureRemoteExists(pouch));

    dispatch({
      type: SIGNUP,
      payload,
      meta: {
        user
      }
    });
  }
}
