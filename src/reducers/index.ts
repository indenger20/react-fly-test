import { combineReducers } from 'redux-immutable';
import appReducer from './appReducer';

const mainAppReducer = combineReducers({
  appReducer,
});

const rootReducer = (state: any, action: any) => {
  return mainAppReducer(state, action);
};

export default rootReducer;

export * from './appReducer';
