import {useState, useEffect} from 'react'
import './../../assets/style/hotel.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { addSuccess, addError, addRequest } from '../../store/slices/hotelSlice';
import { loadStart, loadEnd } from '../../store/slices/loadingSlice';
import { editClose } from '../../store/slices/editHotelSlice';

export const apiUrl = "http://192.168.0.173:8080/api";

export const FACILITIES = [
    "Outdoor swimming pool", "Airport shuttle", "Spa", "Room service", "Fitness center", "Restaurant", "Non-smoking rooms", "Tea/Coffee Maker in All Rooms", "Bar", "Breakfast"
]

export default function AddHotel(props: any) {
    const [facility] = useState(FACILITIES);
    const {register, formState: {errors}, handleSubmit} = useForm();
    const editHotelData: any = useAppSelector((state) => state.editHotel.editData);
    const editHotel = useAppSelector((state) => state.editHotel.edit);
    const auth: any = useAppSelector((state) => state.auth.auth)
    const authId = auth.id
    const dispatch = useAppDispatch();

    const hotelSubmit: SubmitHandler<any> =  (data) => {
        console.log(data)
        if (data.image.length == 0) return requestFun(data, false);
        const reader = new FileReader();
        reader.readAsDataURL(data.image[0]);
        reader.onloadend = async () =>{
            requestFun(data, reader.result)
        }
    }

    const requestFun = async (data: any, img: any) => {
        if(img){
            data.image = img;
            console.log("askd;fkalsdf")
        } else {
            delete data.image;
            console.log("object")
        }
        const idRow: any = localStorage.getItem("agencyAuthToken");
        const id = JSON.parse(idRow)
        data.adminId = id.id
        dispatch(addRequest())
        dispatch(loadStart())
        const res = await axios.post(`${apiUrl}/${editHotel ? "edit-hotel" : "add"}?id=${editHotel ? editHotelData._id : authId}`, data);
        if (res.status == 200) {
            dispatch(addSuccess())
            props.onHide(false);
            dispatch(editClose())
            dispatch(loadEnd())
        } else {
            dispatch(addError())
            dispatch(editClose())
            dispatch(loadEnd())
            console.log("Something went wrong!");
        }
    }

    const closeSidebar = () => {
        dispatch(editClose())
        props.onHide(false)
    }
  return (
    <>
      <div className="sideBar" style={{right: props.open ? "0" : "-100%"}}>
        <button onClick={() => closeSidebar()} className='close btn bg-brand text-white btn-sm'>&times;</button>
        <form encType='multipart/form-data' onSubmit={handleSubmit(hotelSubmit)} className='w-100'>
            <h2>{editHotel ? "Edit" : "Add"} Hotel</h2>
            <div className="row mt-5">
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Name *</label>
                    {errors.name && <small className='text-danger'> Required field!</small>}
                    <input {...register('name', {required: true})} type="text" className='form-control' defaultValue={editHotelData.name || ''} />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Contact *</label>
                    {errors.contact && <small className='text-danger'> Required field!</small>}
                    <input {...register('contact', {required: true})} type="text" className='form-control' defaultValue={editHotelData.contact || ''} />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Address *</label>
                    {errors.address && <small className='text-danger'> Required field!</small>}
                    <input {...register('address', {required: true})} type="text" className='form-control' defaultValue={editHotelData.address || ''} />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>City *</label>
                    {errors.city && <small className='text-danger'> Required field!</small>}
                    <input {...register('city', {required: true})} type="text" className='form-control' defaultValue={editHotelData.city || ''} />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Details *</label>
                    {errors.details && <small className='text-danger'> Required field!</small>}
                    <input {...register('details', {required: true})} type="text" className='form-control' defaultValue={editHotelData.details || ''} />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Price *</label>
                    {errors.price && <small className='text-danger'> Required field!</small>}
                    <input {...register('price', {required: true})} type="text" className='form-control' defaultValue={editHotelData.price || ''} />
                </div>
                <div className="col-md-6 form-group mb-3">
                    <label className='mb-1'>Rooms *</label>
                    {errors.rooms && <small className='text-danger'> Required field!</small>}
                    <input {...register('rooms', {required: true})} type="text" className='form-control' defaultValue={editHotelData.rooms || ''} />
                </div>
                <div className="col-md-12 form-group mb-3">
                    <label className='mb-1'>Facilities *</label>
                    {errors.facilities && <small className='text-danger'> Required field!</small>}
                    {facility && 
                    <div className='row'>
                        {facility.map((val: any, index: any) =>
                            <div className='col-md-6' key={index}>
                                <input {...register("facilities", {required: true})} type={"checkbox"} name={"facilities"} defaultValue={val} id={`${val}-${index+1}`} defaultChecked={editHotel && editHotelData.facilities.find((f: any)=> val === f) || false} />
                                <label className='ms-1' htmlFor={`${val}-${index+1}`}>{val}</label>
                            </div>
                        )}
                    </div>
                    }
                </div>
                <div className="col-12 form-group mb-4">
                    <div><label className='mb-1'>Image</label></div>
                    <input {...register("image")} type="file" />
                </div>
                {editHotel &&
                <div className="col-12 form-group mb-4">
                    <div><label className='mb-1'>Image</label></div>
                    <div>
                        <img height={60} src={editHotelData.image.url} alt="images" />
                    </div>
                </div>
                }
                {editHotel ? 
                <div className="col-12 form-group mb-3 text-center">
                    <button className='btn bg-brand text-white'>Save</button>
                </div>
                :
                <div className="col-12 form-group mb-3 text-center">
                    <button className='btn bg-brand text-white'>Submit</button>
                </div>
                }
            </div>
        </form>
      </div>
    </>
  )
}
