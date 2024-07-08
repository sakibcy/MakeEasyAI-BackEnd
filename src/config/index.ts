import dotenv from "dotenv";
dotenv.config();

const { PORT, CREDENTIALS_G } = process.env;
const JWT_TOKEN_NAME = 'x-auth-token';
const SALT_ROUND_DB = 10;

export { PORT, CREDENTIALS_G, JWT_TOKEN_NAME, SALT_ROUND_DB };