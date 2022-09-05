import { Offer } from './Offer'

export interface OfferListState {
  offers: Offer[]
  loading: boolean
  error?: undefined
}

export enum OfferListActionTypes {
  OFFER_LIST_REQUEST = 'OFFER_LIST_REQUEST',
  OFFER_LIST_SUCCESS = 'OFFER_LIST_SUCCESS',
  OFFER_LIST_FAILURE = 'OFFER_LIST_FAILURE',
}

export interface FetchOfferRequestAction {
  type: OfferListActionTypes.OFFER_LIST_REQUEST
}

export interface FetchOfferSuccessAction {
  type: OfferListActionTypes.OFFER_LIST_SUCCESS
  payload: { offers: Offer[] }
}

export interface FetchOfferFailureAction {
  type: OfferListActionTypes.OFFER_LIST_FAILURE
  payload: any
}

export type OfferListAction =
  | FetchOfferSuccessAction
  | FetchOfferRequestAction
  | FetchOfferFailureAction
