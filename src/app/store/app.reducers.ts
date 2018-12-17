import {ActionReducerMap, MetaReducer} from '@ngrx/store';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromRouter from '@ngrx/router-store';
// import * as fromApollo from 'apollo-angular-cache-ngrx';
import {actionLogger} from './action-logger.function';
import {environment} from '../../environments/environment';
import {RouterStateModels} from './models';

import RouterStateUrl = RouterStateModels.RouterStateUrl;

/**
 * We treat each reducer like a table in a database. This means our top level state interface
 * is just a map of keys to inner state types.
 */
export interface State
{
  // apollo: fromApollo.CacheState;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  // apollo: fromApollo.apolloReducer,
  routerReducer: fromRouter.routerReducer
};

export const initialState: Partial<State> = {
  // apollo: fromApollo.apolloReducer(undefined, {type: undefined}),
  routerReducer: fromRouter.routerReducer(undefined, {type: undefined})
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production ? [actionLogger] : [];

export const reducerOptions = { initialState, metaReducers };

