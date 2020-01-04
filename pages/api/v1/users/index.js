// Fake users data
const users = [
  {
    id: 1
  },
  { id: 2 },
  { id: 3 }
];

export default (req, res) => {
  const { method } = req;
  // Get data from your database
  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json(users);
      break;
    case "POST":
      // Update or create data in your database
      // res.status(200).json({ id, name: name || `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
