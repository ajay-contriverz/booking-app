import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const apiUrl = "http://192.168.0.173:8080/api";

export default function HotelListing() {

  const [data, setData] = useState([])

  useEffect(()=>{
    listHotel()
  },[])

  const listHotel = async () => {
    const res = await axios.get(`${apiUrl}/fetch-hotel`) ;
    if(res.status == 200){
      setData(res.data);
    } else {
      console.log("Something went wrong!")
    }
  }
  return (
    <>
      <section>
        <div className="container">
          <div className='bg-light p-4'>
            <h4>Your hotels list</h4>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Image</td>
                    <td>Title</td>
                    <td>Contact</td>
                    <td>Address</td>
                    <td>City</td>
                    <td>Price</td>
                    <td>Total Rooms</td>
                    <td>Facilities</td>
                    <td>Details</td>
                    <td className='text-end'>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((val: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.image ? (<img src={val.image} />) : (<img width={80} src={"https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"} />)}</td>
                    <td>{val.name ? "" : ""}</td>
                    <td>{val.name ? "" : ""}</td>
                    <td>{val.name ? "" : ""}</td>
                    <td>{val.name ? "" : ""}</td>
                    <td>{val.name ? "" : ""}</td>
                    <td>{val.name ? "" : ""}</td>
                    <td>{val.name ? "" : ""}</td>
                    <td>{val.name ? "" : ""}</td>
                    <td className='text-end'>
                      <button className='btn btn-sm bg-brand m-1 text-white'>Edit</button>
                      <button className='btn btn-sm btn-danger m-1'>Delete</button>
                    </td>
                  </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
