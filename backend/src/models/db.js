import sql from 'mssql';

const dbconfig = {
  user: 'Milton',
  password: '280506',
  server: 'ALDAIR',
  database: 'ferrecast',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function getConnection(config) {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    return pool;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    throw error;
  }
}

async function closeConnection(pool) {
  try {
    await pool.close();
  } catch (error) {
    console.error('Error  al cerrar la base de datos:', error.message);
    throw error;
  }
}

export { getConnection, closeConnection, sql, dbconfig };
