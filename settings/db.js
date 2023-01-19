const mysql2 = require('mysql2');
const config = require('../config');

const connection = mysql2.createConnection({
    host: config.HOST,
    port: config.PORT,
    user: config.DBUSER,
    password: config.DBPASSWORD,
    database: config.DBNAME
});

connection.connect((error) => {
    if (error) {
        return console.log('Ошибка подключения ' + error.message);
    } else {
        return console.log('Подключение успешно');
    }
});

module.exports = connection;