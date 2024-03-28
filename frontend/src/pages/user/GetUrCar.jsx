import auth from "../../firebase.js";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Navbar from "../../componet/Navbar.jsx";

export default function GetUrCar() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [carId, setCarId] = useState(null);
  const [carData, setCarData] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  // authenticate user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  // get userId
  useEffect(() => {
    if (authUser) {
      setEmail(authUser.toJSON().email);
      setLoading(true);
      const getUserId = async () => {
        const user_id_data = await axios.post(
          "http://localhost:3001/getData",
          { email },
          {
            headers: { "Content-Type": "application/json" },
          },
        );
        setLoading(false);
        // console.log(user_id_data.data);
        console.log(user_id_data.data.id);
        setUserId(user_id_data.data.id);
      };
      getUserId();
    }

    // get car ID
    try {
      setLoading(true);
      const getCarId = async () => {
        const carId_data = await axios.post(
          "http://localhost:3001/getCarId",
          { user_id },
          {
            headers: { "Content-Type": "application/json" },
          },
        );
        setLoading(false);
        setCarId(carId_data.data.car_id);
      };
      getCarId();
    } catch (e) {
      setError(e);
    }
  }, [authUser, user_id, email]);

  // get car data
  useEffect(() => {
    try {
      const respFunc = async () => {
        setLoading(true);
        const resp = await axios.post(
          "http://localhost:3001/getUserCar",
          { carId },
          {
            headers: { "Content-Type": "application/json" },
          },
        );
        console.log(resp);
        if (resp.data.data) {
          setCarData(resp.data.data[0]);
        }
        setLoading(false);
      };
      respFunc();
    } catch (err) {
      setError(err);
    }
  }, [carId]);

  async function handleClick() {
    if (authUser) {
      try {
        setLoading(true);
        const resp = await axios.post(
          "http://localhost:3001/createLink",
          { user_id },
          {
            headers: { "Content-Type": "application/json" },
          },
        );
        setLoading(false);
        window.location.href = resp.data.linkUrl;
      } catch (err) {
        setError(err);
      }
    }
  }
  console.log(carData);
  return (
    <>
      <Navbar></Navbar>
    <div className="text-teal-100 font-bold h-screen flex justify-center flex-col gap-10 bg-base-content">
      {carData ? (
        <div className="flex justify-center bg-base-content gap-10 flex-col ">
          <h2 className="flex justify-center text-4xl">Vehicle Information</h2>
          <div className="flex justify-center bg-base-content gap-10">
            <div>
              {" "}
              <strong>Brand: </strong>
              <p className="badge badge-accent badge-outline p-5 mx-2">
                {carData.information.brand}
              </p>{" "}
            </div>
            <div>
              <strong>Model: </strong>
              <p className="badge badge-accent badge-outline p-5 mx-2">
                {" "}
                {carData.information.model}
              </p>
            </div>
            <div>
              {" "}
              <strong>VIN: </strong>
              <p className="badge badge-accent badge-outline p-5 mx-2">
                {" "}
                {carData.information.vin}
              </p>
            </div>
            <div>
              {" "}
              <strong>Year: </strong>
              <p className="badge badge-accent badge-outline p-5 mx-2">
                {" "}
                {carData.information.year}
              </p>
            </div>
          </div>
        <div className ="flex justify-center bg-base-content gap-10">
          <div className="stats outline  outline-zinc-700 shadow stats-vertical lg:stats-horizontal">
            <div className="stat place-items-center">
              <div className="stat-title">Battery capacity</div>
              <div className="stat-value">{carData.chargeState.batteryCapacity}</div>
              <div className="stat-desc">  amount of power a battery can store in mAh</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Range</div>
              <div className="stat-value text-secondary">{carData.chargeState.range}</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">max current</div>
              <div className="stat-value">{carData.chargeState.maxCurrent}</div>
            </div>
          </div>

        </div>

        </div>
      ) : null}

      <div className="flex justify-center items-center gap-5">
        <button className="btn btn-accent" onClick={handleClick}>
          Get Ur Car
        </button>

        <div className="flex justify-center bg-base-content">
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
        </>
  );
}
        {// <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
              //<div className="stat-desc">↘︎ 90 (14%)</div>
        }
