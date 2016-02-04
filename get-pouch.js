import getKey from './get-key';
import PouchDB from 'pouchdb';

const pouchs = {};

export default function getPouch(pouch) {
  const key = getKey(pouch);

  if (!pouchs[key]) {
    // Create the local PouchDB instance
    const db = new PouchDB(pouch.local.name, pouch.local.options);

    let dbRemote;
    let syncHandler;

    if (pouch.remote) {
      dbRemote = new PouchDB(pouch.remote.name);
      // And sync it to the remote!
      syncHandler = db.sync(pouch.remote.name, pouch.remote.options);
    }

    pouchs[key] = {
      db,
      dbRemote,
      syncHandler
    };
  }

  return pouchs[key];
}

