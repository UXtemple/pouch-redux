import { setSyncing } from './actions';

export default function watchSync(handler, dispatch) {
  const onActive = () => dispatch(setSyncing(true));
  const onPause = () => dispatch(setSyncing(false));

  handler.addListener('active', onActive);
  handler.addListener('paused', onPause);

  return function watchSyncOff() {
    handler.removeListener('active', onActive);
    handler.removeListener('paused', onPause);
  }
}
