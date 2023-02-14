import React, {useState} from 'react'
import './../../assets/style/hotel.css'
import { useForm, SubmitHandler } from 'react-hook-form'

export const FACILITIES = [
    "Outdoor swimming pool", "Airport shuttle", "Spa", "Room service", "Fitness center", "Restaurant", "Non-smoking rooms", "Tea/Coffee Maker in All Rooms", "Bar", "Breakfast"
]

export default function AddHotel() {
    const [facility] = useState(FACILITIES);
    const {register, handleSubmit} = useForm();

    const hotelSubmit: SubmitHandler<any> = (data, e) => {
        console.log(data)
    }

  return (
    <>
      <div className="sideBar">
        <button className='close btn bg-brand text-white btn-sm'>&times;</button>
        <form onSubmit={handleSubmit(hotelSubmit)} className='w-100'>
            <h2>Add Hotel</h2>
            <div className="mt-5">
                <div className="form-group mb-3">
                    <label className='mb-1'>Name</label>
                    <input {...register('name')} type="text" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Owner Name</label>
                    <input {...register('ownerName')} type="text" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Contact</label>
                    <input {...register('contact')} type="text" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Address</label>
                    <input {...register('address')} type="text" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>City</label>
                    <input {...register('city')} type="text" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Details</label>
                    <input {...register('details')} type="text" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Price</label>
                    <input {...register('price')} type="text" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Rooms</label>
                    <input {...register('rooms')} type="text" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Facilities</label>
                    {facility && 
                        facility.map((val: any, index: any) =>
                            <div key={index}>
                                <input {...register("facility")} type={"checkbox"} name={"facility"} value={val} id={`${val}-${index+1}`} />
                                <label className='ms-1' htmlFor={`${val}-${index+1}`}>{val}</label>
                            </div>
                        )
                    }
                </div>
                <div className="form-group mb-4">
                    <label className='mb-1'>Image</label>
                    <input {...register('image')} type="file" />
                </div>
                <div className="form-group mb-3 text-center">
                    <button className='btn bg-brand text-white'>Submit</button>
                </div>
            </div>
        </form>
      </div>
    </>
  )
}
