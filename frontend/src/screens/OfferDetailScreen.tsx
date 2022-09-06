import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '../store'
import { ReduxState } from '../types/ReduxState'
import { listOfferDetails } from '../actions/offerActions'

const OfferDetailScreen: React.FC = () => {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const { offer, loading, error } = useSelector(
    (state: ReduxState) => state.offerDetail
  )

  useEffect(() => {
    params.id && dispatch(listOfferDetails(params.id))
  }, [params.id, dispatch, listOfferDetails])

  return <div>OfferDetailScreen</div>
}

export default OfferDetailScreen
