import { useState, useEffect } from "react";
import Navbar from "../../componet/NavbarAdmin.jsx";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Charts() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/history", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const Rdata = await response.json();
        setNodes(Rdata);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col gap-10 bg-base-content">
        <Navbar />
        <div className="flex flex-col mt-16  text-center justify-center ">
          {loading ? (
            <div className="flex justify-center text-center">
              <span className="loading loading-infinity  btn-wide"></span>
            </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
             <LineChart width={1000} height={600} data={nodes}>
              <CartesianGrid stroke="#ccc" />
              <Line type="monotone" dataKey="payment_amount" stroke="#00ff00" />
              <Line type="monotone" dataKey="energy_amount" stroke="#ff2200" />
              <Tooltip />
              <YAxis />
              <XAxis dataKey="transaction_date"  />
              <Legend />
            </LineChart>
          )}
        </div>
      </div>
    </>
  );
}
