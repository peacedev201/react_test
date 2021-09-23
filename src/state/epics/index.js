import { combineEpics } from "redux-observable";
import { catchError } from "rxjs/operators";

const epics = [];

const rootEpic = (action$, store$, dependencies) =>
  combineEpics(...epics)(action$, store$, dependencies).pipe(
    // Adding global error handler
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export default rootEpic;
