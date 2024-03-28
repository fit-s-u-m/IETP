import Navbar from "../../componet/Navbar.jsx";
import logo from "../../assets/logo/2.png";
export default function Tnx() {
  return (
    <>
      <Navbar />
      <div
        className="bg-gray-800 h-screen flex justify-center items-center "
        id="tnx"
      >
        <div className="hero min-h-screen bg-base-500">
          <div className="hero-content flex-col lg:flex-row">
            <img src={logo} className="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold">Thank you for you support</h1>
              <p className="py-6">
                We wanted to take a moment to express our sincere gratitude for
                choosing our electric charging station for your vehicle. By
                utilizing clean and sustainable energy, you are making a
                positive impact on the environment, and we truly appreciate your
                commitment to a greener future.
              </p>
            </div>
          </div>
        </div>
      </div>


    </>

  );
}
