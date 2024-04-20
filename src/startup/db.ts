import pg, {Client} from 'pg'
import dotenv from "dotenv";

dotenv.config()

export const startDB = async () => {
    // @ts-ignore
    const client = new Client({
        host: process.env.PGHOST,
        port: 5432,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE
    })
    await client.connect()

    const res = await client.query('SELECT * FROM USERS')

    console.log(`here is ${res}`)
    await client.end()
}

