import Navbar from "../../componet/Navbar.jsx";
export default function Contact() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div className="hero min-h-screen bg-base-300">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Contact</h1>
              <p className="py-6">
                you can find us on our school Addis Abeba science and technology
                university
              </p>
              <button className="btn btn-primary"> <a href="https://sites.google.com/view/eproject55/projects">check our website</a></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
