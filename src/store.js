import { createStore as createReduxStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import thunk from "redux-thunk";

import reducers from "./state/reducers";
import rootEpic from "./state/epics";

const createStore = () => {
  const epicMiddleware = createEpicMiddleware();

  const middlewares = [thunk, epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [
    middlewareEnhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  ];
  const composedEnhancers = compose(...enhancers);

  const store = createReduxStore(reducers, {}, composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
};

export default createStore;
