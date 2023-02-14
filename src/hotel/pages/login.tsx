import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { agencyLoggedIn, agencyLoggedOut } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const apiUrl = "http://192.168.0.173:8080/api";

export default function login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm();

  const loginHandler: SubmitHandler<any> = async (data, e) => {
    const res = await axios.post(`${apiUrl}/agency-signin`, data);
    console.log(res)
    if (res.status == 200) {
      if (res.data.auth){
        localStorage.setItem("agencyAuthToken", JSON.stringify(res.data));
        dispatch(agencyLoggedIn());
        setTimeout(() => {
          navigate("/dashboard")
        }, 2000);
      } else {
        dispatch(agencyLoggedOut());
      }
    }
  }

  return (
    <section className='loginPage d-flex align-items-center py-5'>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 position-static">
            <div className="searchBox p-4">
              <h3 className='text-white'>Login as agency</h3>
              <p className='text-white'>If you don't have an account, <Link className='text-white text-decoration-underline' to={"/register"}>Register here!</Link></p>
              <form onSubmit={handleSubmit(loginHandler)}>
                <div className="form-group mb-3">
                    <label className='text-white'>Email</label>
                    <input {...register("email")} type="email" className='form-control' />
                </div>
                <div className="form-group mb-3">
                    <label className='text-white'>Passoword</label>
                    <input {...register("password")} type="password" className='form-control' />
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
