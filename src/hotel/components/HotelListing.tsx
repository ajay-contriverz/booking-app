import axios from 'axios'
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { loadStart, loadEnd } from '../../store/slices/loadingSlice';
import { editOpen } from '../../store/slices/editHotelSlice';

export const apiUrl = "http://192.168.0.173:8080/api";

export default function HotelListing() {
  const [data, setData] = useState([])
  const dispatch = useAppDispatch()
  const hotelAdded = useAppSelector((state) => state.hotel.success)
  const auth: any = useAppSelector((state) => state.auth.auth)
  const authId = auth.id

  useEffect(()=>{
    listHotel()
  },[hotelAdded, auth])

  const listHotel = async () => {
    dispatch(loadStart())
    if(authId !== undefined){
      const res = await axios.get(`${apiUrl}/fetch-hotel?id=${authId}`) ;
      if(res.status == 200){
        dispatch(loadEnd())
        setData(res.data);
      } else {
        dispatch(loadEnd())
        console.log("Something went wrong!")
      }
    }
  }
  
  const deleteHandler = async (id: any) => {
    dispatch(loadStart())
    const res = await axios.post(`${apiUrl}/delete-hotel`, {id: id});
    if(res.status == 200){
      dispatch(loadEnd())
      setData(res.data);
    } else {
      dispatch(loadEnd())
      console.log("Something went wrong!")
    }
  }

  const editHoteler = (data: any) => {
    dispatch(editOpen(data))
  }

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className='bg-light p-4'>
            <h4>Your hotels list</h4>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <td><b>#</b></td>
                    <td><b>Image</b></td>
                    <td><b>Title</b></td>
                    <td><b>Contact</b></td>
                    <td><b>Address</b></td>
                    <td><b>City</b></td>
                    <td><b>Price</b></td>
                    <td><b>Total Rooms</b></td>
                    <td><b>Facilities</b></td>
                    <td><b>Details</b></td>
                    <td className='text-end'><b>Actions</b></td>
                  </tr>
                </thead>
                <tbody>
                  {data && data.map((val: any, index: number) => (
                  <tr key={index}>
                    <td><b>{index + 1}</b></td>
                    <td>{val.image ? (<img src={val.image.url} width={80} />) : (<img width={80} src={"https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"} />)}</td>
                    <td>{val.name ? val.name : "-"}</td>
                    <td>{val.contact ? val.contact : "-"}</td>
                    <td>{val.address ? val.address : "-"}</td>
                    <td>{val.city ? val.city : "-"}</td>
                    <td>{val.price ? "$"+val.price : "-"}</td>
                    <td>{val.rooms ? val.rooms : "-"}</td>
                    <td>{val.facilities ? val.facilities.join(", ") : "-"}</td>
                    <td>{val.details ? (val.details.length > 40 ? val.details.slice(0, 40)+"..." : val.details) : "-"}</td>
                    <td className='text-end'>
                      <button onClick={()=> editHoteler(val)} className='btn btn-sm bg-brand m-1 text-white'>Edit</button>
                      <button onClick={()=>deleteHandler(val._id)} className='btn btn-sm btn-danger m-1'>Delete</button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
              {data.length === 0 && <p className='text-center mt-5'>No data found!</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
