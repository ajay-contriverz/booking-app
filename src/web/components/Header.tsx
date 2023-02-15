import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hook";
import "./../../assets/style/web.css";

export default function Header() {
  const [user, setUser] = useState<any>();
  const path = useLocation();
  const userLoggedin = useAppSelector<any>((state: any) => state.login.success);
  const userSignUp = useAppSelector<any>((state: any) => state.signUp.success);
  const agency = useAppSelector<any>((state: any) => state.user.agency);

  const classStyle = path.pathname === "/" ? "text-white" : "text-brand";

  useEffect(()=> {
    setUser(localStorage.getItem("authToken"));
  },[user])

  return (
    <>
      <header className={`py-3 ${path.pathname === "/" ? "bg-transparent position-absolute" : "bg-light"}`}>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <h1><Link className={classStyle} to={"/"}>Booking.app</Link></h1>
            </div>
            <div className="col-auto">
              {agency ? 
              <Link to={"/dashboard"} className={`${classStyle} me-5`} >Dashboard</Link>
              :
              <Link to={"agency"} className={`${classStyle} me-5`} >Agency</Link>
              }
              {user || userSignUp || userLoggedin ? 
                <button onClick={()=> (localStorage.removeItem("authToken"), setUser(""))} className={`border-0 bg-transparent ${classStyle}`}>Logout</button>
                :
                <Link to={"login"} className={classStyle} >Login</Link>
              }
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
