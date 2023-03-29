import jwt from "jsonwebtoken";
import config from "../config";
export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

export const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, config.jwtSecret as string);
  return decoded;
};
