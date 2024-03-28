import logo from "../assets/logo/1.png";
import { Link } from "react-router-dom";
import AuthDetail from "./AuthDetail.jsx";
// import GetUrCar from "../pages/user/GetUrCar.jsx"
// import {Outlet, Link, BrowserRouter } from "react-router-dom";
function Navbar() {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <img src={logo} alt="" width="40" />
      </div>
      <div className="flex-none active gap-4">
        <ul className="menu menu-horizontal gap-2">
          <li className="btn btn-outline btn-info btn-xs">
            <Link to="/user/">Home</Link>
          </li>
          <li className="btn btn-outline btn-info btn-xs p-0">
            <Link to="/user/pay">Payment</Link>
          </li>
          <li className="btn btn-outline btn-info btn-xs p-0">
            <Link to="/user/about">About</Link>
          </li>
          <li className="btn btn-outline btn-info btn-xs p-0">
            <Link to="/user/contact">Contact</Link>
          </li>
          <li className="btn btn-outline btn-info btn-xs p-0">
            <Link to="/user/getUrCar">Get Ur Car</Link>
          </li>
        </ul>
        <AuthDetail></AuthDetail>
      </div>
    </div>
  );
}

export default Navbar;
//
// <div className="bg-gray-900 opacity-50 fixed w-full h-11 flex justify-center items-center">
//   <div className="flex gap-20">
//     <img src={logo} alt="" width="30" height="50" />
//     <ul className="flex gap-5">
//       <li>
//         <Link to="/user/">Home</Link>
//       </li>
//       <li>
//         <Link to="/user/pay">Payment</Link>
//       </li>
//       <li>
//         <Link to="/about">About</Link>
//       </li>
//       <li>
//         <Link to="/contact">Contact</Link>
//       </li>
//       <li>
//         <Link to="/user/getUrCar">Get Ur Car</Link>
//       </li>
//     </ul>
//     <AuthDetail></AuthDetail>
//   </div>
// </div>
