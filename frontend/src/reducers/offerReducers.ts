import { OfferListState, OfferListActionTypes, OfferListAction } from '../types'

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
