import jwt from "jsonwebtoken";

const { JWT_SECRET = "secret-key" } = process.env;

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).send({ message: "No autorizado" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: "Token inválido" });
  }

  req.user = payload;

  next();
};
