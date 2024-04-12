"use server";
import getDatabaseConnection from './databaseconfig';

const setAsync = async (query: string, values: any) => {
  const connection = await getDatabaseConnection();
  try {
    const [results] = await connection.query(query, values);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    await connection.end();
  }
}

export default setAsync;
