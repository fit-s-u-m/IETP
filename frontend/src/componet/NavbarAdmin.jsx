import logo from "../assets/logo/1.png";
import { Link } from "react-router-dom";
import AuthDetail from "./AuthDetail.jsx";
function Navbar() {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <img src={logo} alt="" width="50" height="30" />
      </div>
      <div className="flex-none active gap-4">
        <ul className="menu menu-horizontal gap-2">
          <li className="btn btn-outline btn-info btn-xs">
            <Link to="/admin/">Home</Link>
          </li>
          <li className="btn btn-outline btn-info btn-xs p-0">
            <Link to="/admin/history">Transactions</Link>
          </li>
          <li className="btn btn-outline btn-info btn-xs p-0">
            <Link to="/admin/charts">Charts</Link>
          </li>
          <li className="btn btn-outline btn-info btn-xs p-0">
            <Link to="/admin/about">About</Link>
          </li>
          <li className="btn btn-outline btn-info btn-xs p-0">
            <Link to="/admin/contact">Contact</Link>
          </li>
        </ul>
        <AuthDetail></AuthDetail>
      </div>
    </div>
  );
}

export default Navbar;

//   <ul className="flex gap-5 justify-center items-center">
//     <li>
//       <Link to="/admin/">Home</Link>
//     </li>
//     <li>
//       <Link to="/admin/history">Transactions</Link>
//     </li>
//     <li>
//       <Link to="/admin/charts">Charts</Link>
//     </li>
//     <li>
//       <Link to="/about">About</Link>
//     </li>
//     <li>
//       <Link to="/contact">Contact</Link>
//     </li>
//   </ul>
//   <AuthDetail></AuthDetail>
// </div>
