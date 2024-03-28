import { useState } from "react";
import auth from "../firebase.js"
import {createUserWithEmailAndPassword} from "firebase/auth"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [username, setUsername] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const bodydata = [
      {
        email ,
        phoneNum,
        username,
        lname,
        fname,
      },
    ];
    createUserWithEmailAndPassword(auth, email, password)
      .then(() =>{window.location.href = "http://localhost:5173/";}).catch((error) => {
       console.log(error) 
       
      })
    fetch("http://localhost:3001/user", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodydata),
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch(e=>console.log(`error ${e}`))
  };
        // <img src={logo} alt="logo"/>
  return (
    <>
      <div className="p-10 flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl my-3 font-bold leading-9 tracking-tight text-cyan-300">
              Register for the clean energy
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={registerUser}
          >

            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-300"
              >
               First name 
              </label>
              <div className="mt-2">
                <input
                  id="fname"
                  type="text"
                  required
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lname"
                  name="name"
                  type="text"
                  required
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-300"
                htmlFor="username"
              >
              User name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                  phone number
              </label>
              <div className="mt-2">
                <input
                  id="phoneNum"
                  type="number"
                  required
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

