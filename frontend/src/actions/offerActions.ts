import axios from 'axios'
import { AppThunk } from '../store'
import { errorHandler } from './errorHandler'

import { OfferListActionTypes, OfferDetailActionTypes } from '../types'

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

export const listOfferDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch({ type: OfferDetailActionTypes.OFFER_DETAIL_REQUEST })

      const { data } = await axios.get(`/api/offers/${id}`)

      dispatch({
        type: OfferDetailActionTypes.OFFER_DETAIL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: OfferDetailActionTypes.OFFER_DETAIL_FAILURE,
        payload: errorHandler(error),
      })
    }
  }
