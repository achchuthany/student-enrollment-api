module.exports = {
  development: {
    username: "root",
    password: "!2qwasZX",
    database: "student_enrollment_api",
    host: "localhost",
    dialect: "mariadb",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mariadb",
  },
};
