import { useState } from 'react'
import { json, Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios';

export const apiUrl = "http://192.168.0.173:8080/api";

export default function signUp() {
  const { register, handleSubmit} = useForm<any>();
  const [errorMsg, setErrorMsg] = useState<any>();
  const [success, setSuccess] = useState<any>();

  const registerRequest = async (data: any) => {
    try {
      const res = await axios.post(`${apiUrl}/agency-signup`, data);
      if (res.status == 200) {
        setSuccess("Registered successfully!");
        localStorage.setItem("agencyAuthToken", JSON.stringify(res.data))
        setTimeout(() => {
          window.location.replace("/dashboard")
        }, 2000);
      } else {
        setSuccess("Something went wrong!")
      }
    } catch (error) {
        setSuccess("Something went wrong!")
    }
  }

  const registerHandler: SubmitHandler<any> = (data, e) => {
    console.log(data)
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!data.name || !data.email || !data.contact || !data.password) return setErrorMsg("All fields are required!")
    if (!data.email.match(validRegex)) return setErrorMsg("Enter valid email!")
    if (data.password !== data.confirmPassword) return setErrorMsg("Password and confirm password does not match!");
    setErrorMsg("");
    delete data.confirmPassword;
    registerRequest(data)
  }
  return (
    <section className='loginPage d-flex align-items-center py-5'>
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-md-8 position-static">
                  <div className="searchBox p-4">
                    <h3 className='text-white'>Register your agency</h3>
                    <p className='text-white'>If you already have an account, <Link className='text-white text-decoration-underline' to={"/agency"}>Login here!</Link></p>
                    <form onSubmit={handleSubmit(registerHandler)} className='row align-items-end'>
                        <div className='col-md-4'>
                            <div className="form-group mb-3">
                              <label className='text-white'>Agency name</label>
                              <input {...register('name')} type="text" className='form-control' />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className="form-group mb-3">
                              <label className='text-white'>Email</label>
                              <input {...register('email')} type="email" className='form-control' />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className="form-group mb-3">
                              <label className='text-white'>Contact</label>
                              <input {...register('contact')} type="number" className='form-control' />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className="form-group mb-3">
                              <label className='text-white'>Passoword</label>
                              <input {...register('password')} type="password" className='form-control' />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className="form-group mb-3">
                              <label className='text-white'>Confirm Passoword</label>
                              <input {...register('confirmPassword')} type="password" className='form-control' />
                            </div>
                        </div>
                        <div className='col-md-4'>
                          <div className="form-group mb-3">
                            <button className='btn w-100 bg-brand text-white'>Register</button>
                          </div>
                        </div>
                        {/* {loading && <p className='text-white'>loading...</p>} */}
                        {errorMsg && <span className='badge w-auto bg-danger mx-auto'>{errorMsg}</span>}
                        {success && <span className='badge bg-success w-auto mx-auto'>Logged in Successfully!</span>}
                  </form>
                </div>
              </div>
          </div>
      </div>
    </section>
  )
}
