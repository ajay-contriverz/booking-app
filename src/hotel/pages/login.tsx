import React from 'react'
import { Link } from 'react-router-dom'

export default function login() {
  return (
    <section className='loginPage d-flex align-items-center py-5'>
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-md-4 position-static">
                  <div className="searchBox p-4">
                    <h3 className='text-white'>Login as agency</h3>
                    <p className='text-white'>If you don't have an account, <Link className='text-white text-decoration-underline' to={"/register"}>Register here!</Link></p>
                    <form>
                      <div className="form-group mb-3">
                          <label className='text-white'>Email</label>
                          <input type="text" className='form-control' />
                      </div>
                      <div className="form-group mb-3">
                          <label className='text-white'>Passoword</label>
                          <input type="password" className='form-control' />
                      </div>
                      <div className="form-group mb-3">
                          <button className='btn w-100 bg-brand text-white'>Login</button>
                      </div>
                      {/* {loading && <p className='text-white'>loading...</p>}
                      {error && <p className='badge bg-danger w-100'>{error}</p>}
                      {success && <p className='badge bg-success w-100'>Logged in Successfully!</p>} */}
                  </form>
                </div>
              </div>
          </div>
      </div>
    </section>
  )
}
