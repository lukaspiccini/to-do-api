module.exports = {
  "type": "mssql",
  "host": process.env.DB_HOST,
  "port": parseInt(process.env.DB_PORT),
  "database": process.env.DB_NAME,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "extra": {
    "driver": "msnodesqlv8",
    "options": {
      "encrypt": true,
      "trustedConnection": true,
      "trustServerCertificate": true
    }
  },
  "entities": [
    "dist/**/*.entity{.ts,.js}"
  ],
  "synchronize": true
}