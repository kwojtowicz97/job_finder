import {
  OfferListState,
  OfferListActionTypes,
  OfferListAction,
  OfferDetailState,
  OfferDetailActionTypes,
  OfferDetailAction,
} from '../types'

const initialOfferListState: OfferListState = {
  offers: [],
  loading: false,
}

export const offerListReducer = (
  state: OfferListState = initialOfferListState,
  action: OfferListAction
) => {
  switch (action.type) {
    case OfferListActionTypes.OFFER_LIST_REQUEST:
      return { loading: true, offers: initialOfferListState.offers }
    case OfferListActionTypes.OFFER_LIST_SUCCESS:
      return { loading: false, offers: action.payload.offers }
    case OfferListActionTypes.OFFER_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
        offers: initialOfferListState.offers,
      }
    default:
      return state
  }
}

const initialOfferDetailState: OfferDetailState = {
  loading: false,
}

export const offerDetailReducer = (
  state: OfferDetailState = initialOfferDetailState,
  action: OfferDetailAction
) => {
  switch (action.type) {
    case OfferDetailActionTypes.OFFER_DETAIL_REQUEST:
      return { loading: true }
    case OfferDetailActionTypes.OFFER_DETAIL_SUCCESS:
      return { loading: false, offers: action.payload.offer }
    case OfferDetailActionTypes.OFFER_DETAIL_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
