import database from "../../../../infra/database.js"

export default async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 as teste;")
  console.log(result.rows[0])

  console.log(process.env.NODE_ENV)

  return res.status(200).json({
    message: "Este é um teste",
  });
}
