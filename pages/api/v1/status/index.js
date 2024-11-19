export default function status(req, res) {
  console.log(req)
  return res.status(200).json({
    message: "Este é um teste",
  });
}
