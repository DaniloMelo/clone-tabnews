export default function status(req, res) {
  return res.status(200).json({
    message: "Este é um teste",
  });
}
