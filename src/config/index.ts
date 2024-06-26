import dotenv from "dotenv";
dotenv.config();

const { PORT, CREDENTIALS_G } = process.env;

export { PORT, CREDENTIALS_G };