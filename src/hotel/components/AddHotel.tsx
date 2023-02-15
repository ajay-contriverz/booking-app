import React, {useState} from 'react'
import './../../assets/style/hotel.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios';

export const apiUrl = "http://192.168.0.173:8080/api";

export const FACILITIES = [
    "Outdoor swimming pool", "Airport shuttle", "Spa", "Room service", "Fitness center", "Restaurant", "Non-smoking rooms", "Tea/Coffee Maker in All Rooms", "Bar", "Breakfast"
]

export default function AddHotel(props: any) {
    const [facility] = useState(FACILITIES);
    const {register, formState: {errors}, handleSubmit} = useForm();

    const hotelSubmit: SubmitHandler<any> =  async (data, e) => {
        const idRow: any = localStorage.getItem("agencyAuthToken");
        const id = JSON.parse(idRow)
        data.adminId = id.id
        // data.image = data.file_name[0]
        // delete data.file_name
        console.log(data)
        const res = await axios.post(`${apiUrl}/add`, data);
        if (res.status == 200) {
            props.onHide(false)
        } else {
            console.log("Something went wrong!");
        }
    }

  return (
    <>
      <div className="sideBar" style={{right: props.open ? "0" : "-100%"}}>
        <button onClick={() => props.onHide(false)} className='close btn bg-brand text-white btn-sm'>&times;</button>
        <form onSubmit={handleSubmit(hotelSubmit)} className='w-100'>
            <h2>Add Hotel</h2>
            <div className="row mt-5">
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Name *</label>
                    <input {...register('name', {required: true})} type="text" className='form-control' />
                    {errors.name && <small className='text-danger d-block'>Required field!</small>}
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Owner Name *</label>
                    <input {...register('ownerName', {required: true})} type="text" className='form-control' />
                    {errors.ownerName && <small className='text-danger d-block'>Required field!</small>}
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Contact *</label>
                    <input {...register('contact', {required: true})} type="text" className='form-control' />
                    {errors.contact && <small className='text-danger d-block'>Required field!</small>}
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Address *</label>
                    <input {...register('address', {required: true})} type="text" className='form-control' />
                    {errors.address && <small className='text-danger d-block'>Required field!</small>}
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>City *</label>
                    <input {...register('city', {required: true})} type="text" className='form-control' />
                    {errors.city && <small className='text-danger d-block'>Required field!</small>}
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Details *</label>
                    <input {...register('details', {required: true})} type="text" className='form-control' />
                    {errors.details && <small className='text-danger d-block'>Required field!</small>}
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Price *</label>
                    <input {...register('price', {required: true})} type="text" className='form-control' />
                    {errors.price && <small className='text-danger d-block'>Required field!</small>}
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Rooms *</label>
                    <input {...register('rooms', {required: true})} type="text" className='form-control' />
                    {errors.rooms && <small className='text-danger d-block'>Required field!</small>}
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Facilities *</label>
                    {facility && 
                    <div className='row'>
                        {facility.map((val: any, index: any) =>
                            <div className='col-md-6' key={index}>
                                <input {...register("facility", {required: false})} type={"checkbox"} name={"facility"} value={val} id={`${val}-${index+1}`} />
                                <label className='ms-1' htmlFor={`${val}-${index+1}`}>{val}</label>
                            </div>
                        )}
                    </div>
                    }
                </div>
                {/* <div className="col-12 form-group mb-4">
                    <label className='mb-1 d-block'>Image</label>
                    <input {...register('file_name', {required: false})} type="file" />
                </div> */}
                <div className="col-12 form-group mb-3 text-center">
                    <button className='btn bg-brand text-white'>Submit</button>
                </div>
            </div>
        </form>
      </div>
    </>
  )
}
