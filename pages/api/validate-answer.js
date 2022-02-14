export default function handler(req, res) {
  console.log(process.env.TEST)
  res.status(200).json({ name: "process.env.TEST" })
}