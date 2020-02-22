import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (!environment.production) {
      console.log('state', state);
      console.log('action', action);
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [logger];
