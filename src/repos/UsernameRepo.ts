import pool from "@/config/db"

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username: string) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

export default {
  getAllUsernames,
  insertUsername
};