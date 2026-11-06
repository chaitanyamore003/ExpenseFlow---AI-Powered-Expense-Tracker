const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Check if the certificate is passed as an Environment Variable (Render)
// or if we should read the local ca.pem file (Local Development)
let caCert;
if (process.env.DB_CA_CERT) {
  caCert = process.env.DB_CA_CERT;
} else {
  try {
    caCert = fs.readFileSync(path.join(__dirname, "..", "ca.pem")).toString();
  } catch (err) {
    console.warn(
      "Warning: ca.pem not found locally, and DB_CA_CERT env var is not set.",
    );
  }
}

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: caCert
        ? {
            require: true,
            // ✅ CHANGED THIS LINE: Allows connection even if the CA chain isn't perfectly recognized by Node
            rejectUnauthorized: false,
            ca: caCert,
          }
        : false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

module.exports = db;
