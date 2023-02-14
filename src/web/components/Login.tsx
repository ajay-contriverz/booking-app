import { useAppDispatch, useAppSelector } from './../../store/hook'
import { useForm , SubmitHandler} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginRequest, loginSuccess, loginError } from '../../store/slices/loginSlice'

export const apiUrl = "http://192.168.0.173:8080/api";

export default function Login() {
    const dispatch = useAppDispatch();
    const loading = useAppSelector<any>((state: any) => state.login.loading)
    const error = useAppSelector<any>((state: any) => state.login.error)
    const success = useAppSelector<any>((state: any) => state.login.success)
    console.log(useAppSelector<any>((state: any) => state.login))
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()

    const loginHandler: SubmitHandler<any> = async (data, e: any) => {
        dispatch(loginRequest())
        const res = await axios.post(`${apiUrl}/login`, data);
        console.log(res)
        if (res.status == 200){
            if (res.data.success){
                dispatch(loginSuccess(res.data.result));
                localStorage.setItem("authToken", res.data.auth)
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            }
            dispatch(loginError(res.data.result))
        }
        dispatch(loginError(res.data.result))
    }
  return (
    <>
        <form onSubmit={handleSubmit(loginHandler)}>
            <div className="form-group mb-3">
                <label className='text-white'>Email</label>
                <input {...register('email')} type="text" className='form-control' />
            </div>
            <div className="form-group mb-3">
                <label className='text-white'>Passoword</label>
                <input {...register('password')} type="password" className='form-control' />
            </div>
            <div className="form-group mb-3">
                <button className='btn w-100 bg-brand text-white'>Login</button>
            </div>
            {loading && <p className='text-white'>loading...</p>}
            {error && <p className='badge bg-danger w-100'>{error}</p>}
            {success && <p className='badge bg-success w-100'>Logged in Successfully!</p>}
        </form>
    </>
  )
}
