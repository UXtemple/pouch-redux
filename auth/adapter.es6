import ajax from 'pouchdb/extras/ajax';
// TODO See why we when we use fetch the Auth cookie, despite coming back with the request,
// isn't shared across with further requests made by pouchdb.
// It might be a browser thing in which it doesn't think requests to the same endpoint are the same
// despite the mechanism used to send them and thus doesn't set the cookie?

function getSessionUrl(remote) {
  return `${remote.match(/^(https?:\/\/.+)\//)[1]}/_session`;
}

function fetchSession(remote, options) {
  return new Promise((resolve, reject) => {
    ajax({
      ...options,
      url: getSessionUrl(remote)
    }, (err, res) => {
      if (err) {
        const error = new Error(err.message);
        error.response = err;
        reject(error);
      } else {
        resolve(res);
      }
    })
  });
}

export function login(remote, name, password) {
  return fetchSession(remote, {
    body: {
      name,
      password
    },
    method: 'POST'
  });
}

export function logout(remote) {
  return fetchSession(remote, {
    method: 'DELETE'
  });
}
