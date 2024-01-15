import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host:process.env.MYSQL_HOST,
  user:process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DATABASE,
}).promise()

export async function getAllUsers(){
  const [rows] = await pool.query("SELECT * FROM users")
  return rows
}
export async function getAllTransactions(){
  const [rows] = await pool.query("SELECT * FROM transactions")
  return rows
}

export async function getUser(id){
  const [rows] = await pool.query(`
    SELECT * FROM users
    where id=?
    `,[id])
  return rows[0]
}

export async function getTransaction(id){
  const [rows] = await pool.query(`
    SELECT * FROM transactions
    where id=?
    `,[id])
  return rows[0]
}

export async function createTransactionDB(data) {
  try {
    console.log(data);

    // Validate input data
    const { energy_amount, payment_amount, user_id,transaction_date } = data;
    if (typeof energy_amount !== 'number' || typeof payment_amount !== 'number' || typeof user_id !== 'number') {
      throw new Error('Invalid input data');
    }

    // Insert new transaction
    const [rows] = await pool.query(`
      INSERT INTO transactions (energy_amount, payment_amount, user_id,transaction_date)
      VALUES (?, ?, ?,?)
    `, [energy_amount, payment_amount, user_id,transaction_date]);

    const id = rows.insertId;
  } catch (error) {
    console.error('Error in createTransactionDB:', error);
    throw error; // Rethrow the error for the calling code to handle
  }
}


export async function createUserDB(data){
  const [fname, lname, phoneNum, email, username] = data
  const [rows] = await pool.query(`
    INSERT INTO users (fname,lname,phone_num,email,user_name)
    VALUES (?,?,?,?,?)
    `,[fname,lname,phoneNum,email,username])
  const id = rows.insertId
  return await getUser(id)
}
export async function getUserByEmail(email) {
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      return getUser(rows[0].id); 
    } else {
      console.log("No user found with email:", email);
      return null; 
    }
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw error;
  }
}
export async function setCarId(id,car_id) {
  try {
    const [rows] = await pool.query('UPDATE users SET car_id = ? WHERE id = ?', [car_id, id]);
     return rows;
  } catch (error) {
    console.error("Error in setCarId:", error);
    throw error; // Handle the error as appropriate for your application
  }
}

export async function getCarId(id) {
  try {
    const [rows] = await pool.query(
    ` SELECT car_id FROM users
    where id=?
    `,[id])
     return rows[0];
  } catch (error) {
    console.error("Error in getCarId:", error);
    throw error; // Handle the error as appropriate for your application
  }
}
