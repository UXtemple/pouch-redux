function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function getSessionUrl(remote) {
  return `${remote.match(/^(https?:\/\/.+)\//)[1]}/_session`;
}

function fetchSession(remote, options) {
  return fetch(getSessionUrl(remote), options)
    .then(checkStatus)
    .then(res => res.json());
}

export function login(remote, name, password) {
  return fetchSession(remote, {
    body: JSON.stringify({
      name,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
}

export function logout(remote) {
  return fetchSession(remote, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  });
}
