"use server";
import getDatabaseConnection from './databaseconfig';

const queryAsync = async (query: string, values: any) => {
  const connection = await getDatabaseConnection();
  try {
    const [results] = await connection.query(query, values);
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await connection.end();
  }
}

export default queryAsync;