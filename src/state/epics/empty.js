import { combineEpics, ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { EMPTY } from "rxjs";

import { EMPTY as EMPTY_ACTION } from "../../actions/empty";

const emptyEpic = (action$) =>
  action$.pipe(
    ofType(EMPTY_ACTION),
    mergeMap(() => {
      return EMPTY;
    })
  );

export default combineEpics(emptyEpic);
