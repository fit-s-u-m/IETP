import { useState, useEffect } from "react";
import Navbar from "../../componet/NavbarAdmin.jsx";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";


export default function History() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme(getTheme());

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


  const COLUMNS = [
    { label: "Id", 
      renderCell: (item) => item.id.toString(),
    },
    {
      label: "energy_amount",
      renderCell: (item) => item.energy_amount.toString(),
    },
    {
      label: "payment_amount",
      renderCell: (item) => item.payment_amount.toString(),
    },
    { label: "user_id", 
      renderCell: (item) => item.user_id.toString(),
    },
    { label: "transaction date",
      renderCell: (item) => item.transaction_date,
    },
  ];

  const data = { nodes };

  return (
    <>
      <div className="h-screen bg-base-content flex flex-col gap-10">
        <Navbar />
        <div className="flex flex-col mt-16  text-center ">
          {loading ? (
            <div className="flex justify-center text-center">
              <span className="loading loading-infinity  btn-wide"></span>
            </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <CompactTable columns={COLUMNS} data={data}  theme={theme}/>
          )}
        </div>
      </div>
    </>
  );
}
