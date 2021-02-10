import { all, fork } from 'redux-saga/effects';
import { appSaga } from 'sagas';

export default function* root() {
  yield all([fork(appSaga)]);
}
