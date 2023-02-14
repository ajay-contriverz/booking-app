import React from 'react'
import AddHotel from '../components/AddHotel'
import HotelListing from '../components/HotelListing'
import './../../assets/style/hotel.css'

export default function dashboard() {
  return (
    <>
      <AddHotel/>
      <HotelListing />
    </>
  )
}
