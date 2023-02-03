// const notFound = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`)
//   res.status(404)
//   next(error)
// }

// module.exports = notFound

const notFound = (req, res) => {
  res.status(401).send("Route does not exist");
};

module.exports = notFound;
