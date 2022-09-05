import {
  Action,
  combineReducers,
  configureStore,
  applyMiddleware,
} from '@reduxjs/toolkit'
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk'

import { offerDetailsReducer, offerListReducer } from './reducers/offerReducers'
import { ReduxState } from './types/ReduxState'

export type AppDispatch = ThunkDispatch<ReduxState, unknown, Action<string>>

export type AppThunk = ThunkAction<
  Promise<void>,
  ReduxState,
  unknown,
  Action<string>
>

const reducer = {
  offerList: offerListReducer,
  offerDetais: offerDetailsReducer,
}

const middleware = [thunk]

const initialState = {}

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware,
})

export default store
