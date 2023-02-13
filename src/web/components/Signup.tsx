import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { signupFun } from '../../store/slices/signupSlice';

export default function Signup(props: any) {
    const [errMsg, setErrMsg] = useState<string>()
    const [successMsg, setSuccessMsg] = useState<string>()
    // const [loading, setLoading] = useState<boolean>()
    const { register, handleSubmit } = useForm();
    const dispatch: any = useDispatch();
    const loading = useSelector((state: any) => state.signUp.loading);
    console.log(loading)

    const onSubmitFun: SubmitHandler<any> = (data, e) => {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!data.username || !data.email || !data.password){
            setErrMsg("All fields are required!")
        }else if(!data.email.match(validRegex)){
            setErrMsg("Enter valid email!")
        }else if(data.password === data.confirmPassword){
          delete data.confirmPassword;
            dispatch(signupFun(data));
            setErrMsg("");
            e?.target.reset();
            setSuccessMsg("Your new account has been created successfully!")
            setTimeout(() => {
                window.location.replace("/")
            }, 2000);
        } else {
            setErrMsg("Password and confirm password does not match");
        }
    };
    
    return (
        <>
        <form onSubmit={handleSubmit(onSubmitFun)}>
            <div className="form-group mb-3">
                <label className='text-white'>Name</label>
                <input {...register('username')} type="text" className='form-control' />
            </div>
            <div className="form-group mb-3">
                <label className='text-white'>Email</label>
                <input {...register('email')} type="text" className='form-control' />
            </div>
            <div className="form-group mb-3">
                <label className='text-white'>Passoword</label>
                <input {...register('password')} type="text" className='form-control' />
            </div>
            <div className="form-group mb-4">
                <label className='text-white'>Confirm Password</label>
                <input {...register('confirmPassword')} type="text" className='form-control' />
            </div>
            <div className="form-group mb-3">
                <input className='btn w-100 bg-brand text-white ml-auto' type={"submit"} value={"Submit"} />
            </div>
            {loading && <p className='text-white'>loading...</p>}
            {errMsg && <p className='badge bg-danger w-100'>{errMsg}</p>}
            {successMsg && <p className='badge bg-success w-100'>{successMsg}</p>}
        </form>
    </>
  )
}
