import Navbar from "../../componet/NavbarAdmin.jsx"
import logo2 from "../../assets/img/gas1.jpg";
import logo1 from "../../assets/img/electric.jpg";
export default function Admin() {
  return (
    <>
        <Navbar />
      <div>
        <div className="diff aspect-[16/9]">
          <div className="diff-item-1">
            <img alt="electric car charging stations" src={logo2} />
          </div>
          <div className="diff-item-2">
            <img alt="gasoline stations" src={logo1} />
          </div>
          <div className="diff-resizer"></div>
        </div>
      </div>
    </>
  );
}
