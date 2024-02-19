// models/location.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://nkumymjx:7-1E4PKAaowvHzP7fieBUHVresCj8x46@trumpet.db.elephantsql.com/nkumymjx",
});

async function checkTableExists(tableName) {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM   information_schema.tables 
      WHERE  table_name = $1
    );`;
  const result = await pool.query(query, [tableName]);
  return result.rows[0].exists;
}

async function createLocationTableIfNotExists() {
  const tableExists = await checkTableExists("locations");
  if (!tableExists) {
    const createTableQuery = `
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        coordinates VARCHAR(255) NOT NULL,
        file_url VARCHAR(255) NOT NULL
      );`;
    await pool.query(createTableQuery);
  }
}

async function createLocation(title, coordinates, fileUrl) {
  try {
    await createLocationTableIfNotExists();
    const result = await pool.query(
      "INSERT INTO locations (title, coordinates, file_url) VALUES ($1, $2, $3) RETURNING *",
      [title, coordinates, fileUrl]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Unable to create location");
  }
}

async function getAllLocations() {
  try {
    await createLocationTableIfNotExists();
    const result = await pool.query("SELECT * FROM locations");
    return result.rows;
  } catch (error) {
    throw new Error("Unable to fetch locations");
  }
}

module.exports = { createLocation, getAllLocations };
