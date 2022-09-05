import { Offer } from './Offer'

export interface OfferDetailState {
  offer?: Offer
  loading: boolean
  error?: undefined
}

export enum OfferDetailActionTypes {
  OFFER_DETAIL_REQUEST = 'OFFER_DETAIL_REQUEST',
  OFFER_DETAIL_SUCCESS = 'OFFER_DETAIL_SUCCESS',
  OFFER_DETAIL_FAILURE = 'OFFER_DETAIL_FAILURE',
}

export interface FetchOfferDetailsRequestAction {
  type: OfferDetailActionTypes.OFFER_DETAIL_REQUEST
}

export interface FetchOfferDetailsSuccessAction {
  type: OfferDetailActionTypes.OFFER_DETAIL_SUCCESS
  payload: Offer
}

export interface FetchOfferDetailsFailureAction {
  type: OfferDetailActionTypes.OFFER_DETAIL_FAILURE
  payload: any
}

export type OfferDetailsAction =
  | FetchOfferDetailsSuccessAction
  | FetchOfferDetailsRequestAction
  | FetchOfferDetailsFailureAction
