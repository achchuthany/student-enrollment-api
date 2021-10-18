/* eslint-disable no-irregular-whitespace */
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv-flow");
const cls = require("cls-hooked");

const Logger = require("./loggingHelper");
const ErrorHelper = require("./errorHelper");

if (process.env.NODE_ENV === "test") {
  dotenv.config();
  const namespace = cls.createNamespace("test-namespace");
  Sequelize.useCLS(namespace);
}

const sequelize = new Sequelize("student_enrollment_api", "root", "!2qwasZX", {
  host: "localhost",
  port: "3306",
  dialect: "mariadb",
  logging:
    process.env.NODE_ENV === "test"
      ? false
      : (message) => Logger.log("debug", message), // test to not to show the transaction log
  pool: {
    max: 10,
    min: 0,
  },
});

// Show DB Status
(async () => {
  try {
    await sequelize.authenticate();
    Logger.log("debug", "Connection has been established successfully.");
    if (process.env.NODE_ENV !== "test") {
      console.log(`
███████ ███████ ██████  ██    ██ ███████ ██████      ██████  ██    ██ ███    ██ ███    ██ ██ ███    ██  ██████  
██      ██      ██   ██ ██    ██ ██      ██   ██     ██   ██ ██    ██ ████   ██ ████   ██ ██ ████   ██ ██       
███████ █████   ██████  ██    ██ █████   ██████      ██████  ██    ██ ██ ██  ██ ██ ██  ██ ██ ██ ██  ██ ██   ███ 
     ██ ██      ██   ██  ██  ██  ██      ██   ██     ██   ██ ██    ██ ██  ██ ██ ██  ██ ██ ██ ██  ██ ██ ██    ██ 
███████ ███████ ██   ██   ████   ███████ ██   ██     ██   ██  ██████  ██   ████ ██   ████ ██ ██   ████  ██████  
      `);
    }
  } catch (error) {
    Logger.log(
      "error",
      ErrorHelper({ message: error.message, statusCode: 500 })
    );
  }
})();

module.exports = sequelize;