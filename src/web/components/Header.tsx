import React from "react";
import { Link } from "react-router-dom";
import "./../../assets/style/web.css";

export default function Header() {
  return (
    <>
      <header className="py-3">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-auto">
              <h1><Link className="text-white" to={"/"}>Booking.app</Link></h1>
            </div>
            <div className="col-auto">
                <Link to={"login"} className="text-white">Login</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
