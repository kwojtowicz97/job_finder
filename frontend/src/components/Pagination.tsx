import React from 'react'
import { Pagination as PaginationList } from 'react-bootstrap'

interface Props {
  totalPagesCount: number
  pageNumber: number
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ totalPagesCount, pageNumber, setPageNumber }: Props) => {
  let items = []

  for (let number = 1; number <= totalPagesCount; number++) {
    items.push(
      <PaginationList.Item
        onClick={() => setPageNumber(number)}
        key={number}
        active={number === pageNumber}
      >
        {number}
      </PaginationList.Item>
    )
  }
  return (
    <PaginationList className='justify-content-center'>{items}</PaginationList>
  )
}

export default Pagination
