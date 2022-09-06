import { Offer } from './Offer'

export interface OfferDetailState {
  offer: Offer
  loading: boolean
  error?: undefined
}

export enum OfferDetailActionTypes {
  OFFER_DETAIL_REQUEST = 'OFFER_DETAIL_REQUEST',
  OFFER_DETAIL_SUCCESS = 'OFFER_DETAIL_SUCCESS',
  OFFER_DETAIL_FAILURE = 'OFFER_DETAIL_FAILURE',
}

export interface FetchOfferDetailRequestAction {
  type: OfferDetailActionTypes.OFFER_DETAIL_REQUEST
}

export interface FetchOfferDetailSuccessAction {
  type: OfferDetailActionTypes.OFFER_DETAIL_SUCCESS
  payload: { offer: Offer }
}

export interface FetchOfferDetailFailureAction {
  type: OfferDetailActionTypes.OFFER_DETAIL_FAILURE
  payload: any
}

export type OfferDetailAction =
  | FetchOfferDetailSuccessAction
  | FetchOfferDetailRequestAction
  | FetchOfferDetailFailureAction
