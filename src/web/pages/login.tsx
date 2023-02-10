import { useState } from 'react'
import { useSelector } from 'react-redux'
import Login from '../components/Login'
import Signup from '../components/Signup'

export default function login() {
  const [signin, setSignin] = useState(false)

  return (
    <>
    <section className='loginPage d-flex align-items-center py-5'>
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-md-4 position-static">
                  <div className="searchBox p-4">
                      <h3 className='text-white'>{signin ? "Create a Account": "Login"}</h3>
                      {signin ? 
                        <>
                          <p className='text-white'>You already have an account- <span className='text-white text-decoration-underline' role='button' onClick={()=> setSignin(false)}>Login here.</span></p>
                          <Signup />
                        </>
                        :
                        <>
                          <p className='text-white'>You don't have an account- <span className='text-white text-decoration-underline' role='button' onClick={()=> setSignin(true)}>Signup here.</span></p>
                          <Login />
                        </>
                      }
                  </div>
              </div>
          </div>
      </div>
    </section>
  </>
  )
}
