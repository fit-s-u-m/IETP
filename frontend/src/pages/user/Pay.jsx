import axios from "axios";
import Navbar from "../../componet/Navbar.jsx";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase.js";

import img1 from "../../assets/plan/1.png";
import img2 from "../../assets/plan/pro.png";
import img3 from "../../assets/plan/3.png";

export default function Pay() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [userEnergy,setEnergy] = useState(0)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  async function handleSubmit(energy) {
    let payload = {};
    payload.amount = calcPrice(energy);
    let email;
    let user_id;

    if (authUser) {
      // get user email and use it to get all the data about the user
      email = authUser.toJSON().email;
      console.log(email);
      setLoading(true);
      const rep = await axios.post(
        "http://localhost:3001/getData",
        { email },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      setLoading(false);
      payload = rep.data;
      user_id = payload.id;

      // sending for chapa payment
      const response = await axios.post(
        "http://localhost:3001/pay",
        { email, amount: calcPrice(energy) },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      console.log(response);
      window.location.href = response.data.data.checkout_url;
    } else {
      setError("user not found");
    }
    const date = new Date();
    let transaction = {
      email,
      energy_amount: energy,
      payment_amount: calcPrice(energy),
      transaction_date:
        date.getHours() +
        "-" +
        date.getMinutes() +
        "-" +
        date.getSeconds() +
        "/" +
        date.toLocaleDateString(),
      user_id,
    };
    console.log(transaction);

    // tracking transactions and sending to the backend to store it
    setLoading(true);
    await axios.post("http://localhost:3001/transaction", transaction, {
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
  }
  return (
    <div className="overflow-x-auto">
      <Navbar />
      <div className="bg-gray-800 min-h-screen py-12 flex items-center justify-center flex-col ">
        <div className="py-12 grid   gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {item(img1, 100, handleSubmit,"bg-green-900")}
          {item(img2, 50, handleSubmit,"bg-amber-600")}

          <div className="card w-96 bg-green-800 shadow-xl">
            <figure>
              <img src={img3} alt="payment plan" height="200px" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{` mile driven in avarage is ${mileDriven(
                userEnergy,
              )}`}</h2>
              <div className="flex ">
              <p>{`Energy: ${userEnergy} kWh`}</p>
              <p>{`Price: ${calcPrice(userEnergy)} birr`}</p>
              </div>
              <input
                type="text"
                placeholder="Type here"
                onChange={(e) => setEnergy(e.target.value)}
                className="input input-bordered input-accent text-black w-full max-w-xs m-2"
              />
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmit(userEnergy)}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          {loading ? (
            <span className="loading loading-infinity loading-lg  mt-2"></span>
          ) : null}
          {error ? (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                onClick={() => setError(null)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error.toString()}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function calcPrice(energy) {
  return parseFloat((energy * 1.141).toFixed(2));
}
function mileDriven(energy) {
  const mile = energy / 0.35;
  return parseFloat(mile.toFixed(2));
}
function item(img, energy, handleSubmit,color) {
  const classname="card w-96 " + color 
  return (
    <div className={classname}>
      <figure>
        <img src={img} alt="payment plan" height="200px"/>
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{` mile driven in avarage is ${mileDriven(
          energy,
        )}`}</h2>
              <div className="flex ">
              <p>{`Energy: ${energy} kWh`}</p>
              <p>{`Price: ${calcPrice(energy)} birr`}</p>
              </div>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleSubmit(energy)}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

