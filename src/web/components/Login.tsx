import React from 'react'

export default function Login() {
  return (
    <>
        <form>
            <div className="form-group mb-3">
                <label className='text-white'>Email</label>
                <input type="text" className='form-control' />
            </div>
            <div className="form-group mb-3">
                <label className='text-white'>Passoword</label>
                <input type="text" className='form-control' />
            </div>
            <div className="form-group mb-3">
                <button className='btn w-100 bg-brand text-white'>Login</button>
            </div>
        </form>
    </>
  )
}
