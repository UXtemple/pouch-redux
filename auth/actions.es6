import * as adapter from "./adapter";
import getKey from "../get-key";
import getPouch from "../get-pouch";
import lookup from "../lookup";

function makeSurePouchReduxIsMountedOnStore(pouch) {
  if (!(pouch && pouch.remote && pouch.remote.name)) {
    throw "We need pouch.remote.name in the redux store. Did you mount pouch-redux's reducer?";
  }
}

export const LOGIN = "pouch-redux/auth/LOGIN";
export function login({user, password}) {
  return function loginThunk(dispatch, getState) {
    const { pouch } = getState();
    makeSurePouchReduxIsMountedOnStore(pouch);

    const payload = adapter.login(pouch.remote.name, user, password);

    payload.then(() => lookup.put({
      _id: getKey(pouch),
      user
    }));

    dispatch({
      type: LOGIN,
      payload,
      meta: {
        user
      }
    });
  }
}

export const LOGOUT = "pouch-redux/auth/LOGOUT";
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
