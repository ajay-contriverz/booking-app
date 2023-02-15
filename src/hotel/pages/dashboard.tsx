import { useState } from 'react'
import AddHotel from '../components/AddHotel'
import HotelListing from '../components/HotelListing'
import './../../assets/style/hotel.css'

export default function dashboard() {
  const [ sideBar, setSidebar ] = useState(false);
  return (
    <>
      <section className='py-5'>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto"><h3>Your Dashboard</h3></div>
            <div className="col-auto"><button onClick={() => setSidebar(true)} className='btn bg-brand text-white'>Add Hotel</button></div>
          </div>
        </div>
      </section>
      <AddHotel onHide={(val: boolean) => setSidebar(val)} open={sideBar} />
      <HotelListing />
    </>
  )
}
