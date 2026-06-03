export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? "Error en el servidor" : err.message;

  res.status(statusCode).send({ message });
};
