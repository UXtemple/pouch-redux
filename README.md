# pouch-redux
A set of helpers to ease the integration between PouchDB (and therefore CouchDB) and Redux that
forces you to be in control of your actions using promises.

**WIP WIP WIP**.

## Pre-requisites
Your redux store must use the `thunk` and `promise` middlewares.

## What does it give me?
Not much.
Just a set of helpers to ease the binding.

### pouch reducer
TODO

### wall
TODO

```js
// wall sample
import { connect } from 'react-redux';
import { load } from './actions';
import Authenticate from '../user/authenticate';
import knockKnockGo from 'panels/knock-knock-go';
import React from 'react';

function mapStateToProps(state, props) {
  return state.pouch;
}

export default function pouchWall(ProtectedComponent) {
  const PouchWall = props => (
    props.isReady && props.auth.isReady ?
      <ProtectedComponent {...props} /> :
      <Authenticate {...props} />
  );

  const KnockKnockPouchWall = knockKnockGo(
    props => props.isLoading,
    props => props.error,
    PouchWall,
    props => !(props.isLoading || props.isReady || props.error) && props.dispatch(load())
  );

  return connect(mapStateToProps)(KnockKnockPouchWall);
}
```

### auth
TODO
Redux understands actions and reducers. At UXtemple, we generally use it with React.
In `pouch-redux/auth` you will find a `login` and a `logout` action, a reducer that understands them
and a component to deal with login.

[Here's a great
read](https://www.theodo.fr/blog/2014/11/how-to-build-web-applications-work-offline-pouchdb/) on
handling authentication when you want to still go for an offline-first approach that works with a
remote.

## Why?
After working with `redux-pouch` for a while I got to the point in which the middleware, instead of
making things easier, just got on my way and didn't let me do more advanced stuff.
