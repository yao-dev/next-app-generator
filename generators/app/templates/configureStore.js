import { createStore, combineReducers } from 'redux';
import nextConnectRedux from 'next-connect-redux';
import thunkMiddleware from 'redux-thunk';
import recursive from 'recursive-readdir';
import path from 'path';

export const getReducers = () => {
  recursive(path.join(__dirname, 'src/components'), function (err, files) {
    // `files` is an array of absolute file paths
    console.log('err', err);
    console.log(files);
  });
};

export const initStore = (initialState, options) => {
  const REDUX_DEVTOOLS = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || undefined ;

  rootReducer = combineReducers({
    // list of reducers
  });

  return createStore(
    rootReducer,
    REDUX_DEVTOOLS,
  );
};

export const nextConnect = nextConnectRedux(initStore);
