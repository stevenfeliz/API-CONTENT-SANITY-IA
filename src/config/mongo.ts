import { connect } from 'mongoose';
import "dotenv/config"

export const dbConnect = async () => {

  const DB_URI = <string>process.env.BD_URI

  try {
    const conexion = await connect(DB_URI);
    return `Conexion Ready, db: ${conexion.connection.db.databaseName}`
  } catch (error) {
    console.log(error)
  }



}