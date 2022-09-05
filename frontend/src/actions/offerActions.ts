import axios from 'axios'
import { AppThunk } from '../store'
import { errorHandler } from './errorHandler'

import { OfferListActionTypes } from '../types'

export const listOffers = (): AppThunk => async (dispatch) => {
  try {
    dispatch({ type: OfferListActionTypes.OFFER_LIST_REQUEST })

    const { data } = await axios.get('/api/offers')

    dispatch({ type: OfferListActionTypes.OFFER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: OfferListActionTypes.OFFER_LIST_FAILURE,
      payload: errorHandler(error),
    })
  }
}
