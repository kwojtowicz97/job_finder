import React from 'react'

interface Props {
  city: string
  address: string
}

const Map = ({ city, address }: Props) => {
  return (
    <iframe
      title='map'
      width='auto'
      height='300px'
      style={{ border: 'none', padding: '0' }}
      referrerPolicy='no-referrer-when-downgrade'
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCGmirSsDuPqW2HuouzdFAWl4n6J2l9Krw&q=${city}+${address}`}
    ></iframe>
  )
}

export default Map
