import mysql from 'mysql2/promise';

const getDatabaseConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'gdev-web',
  });
};

export default getDatabaseConnection;