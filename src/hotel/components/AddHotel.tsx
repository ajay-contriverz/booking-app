import {useState} from 'react'
import './../../assets/style/hotel.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios';
import { useAppDispatch } from '../../store/hook';
import { addSuccess, addError, addRequest } from '../../store/slices/hotelSlice';
import { loadStart, loadEnd } from '../../store/slices/loadingSlice';

export const apiUrl = "http://192.168.0.173:8080/api";

export const FACILITIES = [
    "Outdoor swimming pool", "Airport shuttle", "Spa", "Room service", "Fitness center", "Restaurant", "Non-smoking rooms", "Tea/Coffee Maker in All Rooms", "Bar", "Breakfast"
]

export default function AddHotel(props: any) {
    const [facility] = useState(FACILITIES);
    const {register, formState: {errors}, handleSubmit} = useForm();

    const dispatch = useAppDispatch();

    const hotelSubmit: SubmitHandler<any> =  (data, e) => {
        const reader = new FileReader();
        reader.readAsDataURL(data.image[0]);
        reader.onloadend = async () =>{
            const idRow: any = localStorage.getItem("agencyAuthToken");
            const id = JSON.parse(idRow)
            data.adminId = id.id
            data.image = reader.result;
            dispatch(addRequest())
            dispatch(loadStart())
            const res = await axios.post(`${apiUrl}/add`, data);
            if (res.status == 200) {
                dispatch(addSuccess())
                dispatch(loadEnd())
                props.onHide(false);
            } else {
                dispatch(addError())
                dispatch(loadEnd())
                console.log("Something went wrong!");
            }
        }
    }

  return (
    <>
      <div className="sideBar" style={{right: props.open ? "0" : "-100%"}}>
        <button onClick={() => props.onHide(false)} className='close btn bg-brand text-white btn-sm'>&times;</button>
        <form encType='multipart/form-data' onSubmit={handleSubmit(hotelSubmit)} className='w-100'>
            <h2>Add Hotel</h2>
            <div className="row mt-5">
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Name *</label>
                    {errors.name && <small className='text-danger'> Required field!</small>}
                    <input {...register('name', {required: true})} type="text" className='form-control' />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Owner Name *</label>
                    {errors.ownerName && <small className='text-danger'> Required field!</small>}
                    <input {...register('ownerName', {required: true})} type="text" className='form-control' />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Contact *</label>
                    {errors.contact && <small className='text-danger'> Required field!</small>}
                    <input {...register('contact', {required: true})} type="text" className='form-control' />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Address *</label>
                    {errors.address && <small className='text-danger'> Required field!</small>}
                    <input {...register('address', {required: true})} type="text" className='form-control' />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>City *</label>
                    {errors.city && <small className='text-danger'> Required field!</small>}
                    <input {...register('city', {required: true})} type="text" className='form-control' />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Details *</label>
                    {errors.details && <small className='text-danger'> Required field!</small>}
                    <input {...register('details', {required: true})} type="text" className='form-control' />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Price *</label>
                    {errors.price && <small className='text-danger'> Required field!</small>}
                    <input {...register('price', {required: true})} type="text" className='form-control' />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Rooms *</label>
                    {errors.rooms && <small className='text-danger'> Required field!</small>}
                    <input {...register('rooms', {required: true})} type="text" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='mb-1'>Facilities *</label>
                    {facility && 
                    <div className='row'>
                        {facility.map((val: any, index: any) =>
                            <div className='col-md-6' key={index}>
                                <input {...register("facilities", {required: false})} type={"checkbox"} name={"facilities"} value={val} id={`${val}-${index+1}`} />
                                <label className='ms-1' htmlFor={`${val}-${index+1}`}>{val}</label>
                            </div>
                        )}
                    </div>
                    }
                </div>
                <div className="col-12 form-group mb-4">
                    <label className='mb-1 d-block'>Image</label>
                    {errors.image && <small className='text-danger'>Required field!</small>}
                    <input {...register("image", {required: false})} type="file" />
                </div>
                <div className="col-12 form-group mb-3 text-center">
                    <button className='btn bg-brand text-white'>Submit</button>
                </div>
            </div>
        </form>
      </div>
    </>
  )
}
