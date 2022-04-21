import jwt from "jsonwebtoken";

const createJWT = (payload: any, options?: jwt.SignOptions) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, options);
};

export default createJWT;
