import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import timeout from "connect-timeout"
import {
  getCarId,
  createTransactionDB,
  getAllTransactions,
  getUserByEmail,
  getTransaction,
  getUser,
  getAllUsers,
  createUserDB,
  setCarId,
} from "./database.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

console.log(timeout)
app.use(timeout('600s'));

app.get("/history", async (req, res) => {
  const payments = await getAllTransactions();
  let data = [["transaction data", "payment"]];
  for (let i = 0; i < payments.length; i++) {
    data.push([payments[i].transaction_date, payments[i].payment_amount]);
  }
  return res.json(payments);
});
app.post("/transaction", async (req, res) => {
  const data = req.body;
  const payments = await createTransactionDB(data);
  return res.json(await payments);
});

app.post("/getData", async (req, res) => {
  const email = req.body.email;
  const responce = await getUserByEmail(email);
  return res.json(await responce);
});

app.post("/user", async (req, res) => {
  const { fname, lname, phoneNum, email, username } = req.body[0];
  const data = [fname, lname, phoneNum, email, username];
  const responce = await createUserDB(data);
  return res.json(await responce);
});

// enode
app.get("/getToken", async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const apiUrl = "https://oauth.sandbox.enode.io/oauth2/token";
  const authString = `${clientId}:${clientSecret}`;
  const base64Auth = Buffer.from(authString).toString("base64");

  const requestData = {
    grant_type: "client_credentials",
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64Auth}`,
    },
    body: new URLSearchParams(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data.access_token);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

app.post("/createLink", async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const access_token_data = await fetch("http://localhost:3001/getToken");
  let access_token;
  if (access_token_data.ok) {
    access_token = await access_token_data.json();
  }
  const carId = new Date().getTime().toString();
  const apiUrl = `https://enode-api.sandbox.enode.io/users/{carId}/link`;
  const { user_id } = req.body;
  await setCarId(user_id, carId);

  const payload = {
    vendorType: "vehicle",
    language: "en-US",
    scopes: [
      "vehicle:read:data",
      "vehicle:read:location",
      "vehicle:control:charging",
    ],
    colorScheme: "system",
    redirectUri: "http://localhost:5173/user/",
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  fetch(apiUrl, options)
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => res.json(data))
    .catch((error) => console.error("Error:", error));
});
app.post("/getCarId", async (req, res) => {
  const id = req.body.user_id;
  const carId = await getCarId(id);
  return res.json(carId);
});

app.post("/getUserCar", async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const { carId } = req.body;

  if (carId) {
    const access_token_data = await fetch("http://localhost:3001/getToken");
    let access_token;
    if (access_token_data.ok) {
      access_token = await access_token_data.json();
    }

    const apiUrl = `https://enode-api.sandbox.enode.io/users/{carId}/vehicles`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => res.json(data))
      .catch((error) => console.error("Error:", error));
  }
  else {res.json({})}
});
app.post ("/arduino",async (req,res)=>{
  res.send(req.body)
  console.log(req.body)
})

//chapa
app.post("/pay", async (req, res) => {
  const rEmail = req.body.email;
  const amount = req.body.amount;
  const user = await getUserByEmail(rEmail);

  const { fname, lname, email, phone_num } = user;
  const tx_ref = Date.now().toString();
  const CHAPA_AUTH_KEY = process.env.CHAPA_SECRETKEY;
  const payload = {
    amount: amount.toString(),
    currency: "ETB",
    email: email,
    first_name: fname,
    last_name: lname,
    phone_number: phone_num,
    tx_ref: tx_ref,
    return_url: "http://localhost:5173/user/tnx",
    "customization[title]": "Electric car staion payment",
    "customization[description]": `Electric car station payment for ${fname} ${lname}`,
  };

  const url = "https://api.chapa.co/v1/transaction/initialize";
  const header = {
    headers: {
      Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
    mode: "cors",
  };

  try {
    const response = await fetch(url, header);
    const data = await response.json();
    // console.log(data);
    return res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
});

// starter
app.get("/", (re, res) => {
  return res.json("from server");
});
app.listen(3001, () => {
  console.log("server is running");
});

