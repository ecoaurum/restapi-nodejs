'use strict'
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const response = require('../response');
const db = require('../settings/db');
const config = require('../config');

// Выборка всех существующих пользователей
exports.getAllUsers = (req, res) => {
    db.query('SELECT `id`, `firstname`, `lastname`, `email` FROM `users2`', (error, rows, fields) => {
        if (error) {
            response.status(400, error, res);
        } else {
            response.status(200, rows, res);
        }
    })
};

// Регистрация пользователя
exports.signup = (req, res) => {
    db.query("SELECT `id`, `email`, `firstname` FROM `users2` WHERE `email` = '" + req.body.email +"'", (error, rows, fields) => {
        if (error) {
            response.status(400, error,res)
        } else if (typeof rows !== 'undefined' && rows.length > 0) {
            console.log(rows);
            const row = JSON.parse(JSON.stringify(rows));
            row.map((rw) => {
                response.status(302, {message: `Пользователь с таким email - ${rw.email} уже зарегистрирован`}, res);
                return true;
            })
        } else {
            const email = req.body.email;
            const firstname = req.body.firstname;
            const lastname = req.body.lastname !== '' ? req.body.lastname : 'Не указано';
            const salt = bcryptjs.genSaltSync(15);
            const userpassword = bcryptjs.hashSync(req.body.userpassword, salt);


            // Внесение данных в таблицу во время регистрации
            const sql = "INSERT INTO `users2`(`firstname`, `lastname`, `email`, `userpassword`) VALUES('" + firstname + "', '" + lastname + "', '" + email + "', '" + userpassword + "')";
            db.query(sql, (error, results) => {
                if  (error) {
                    response.status(400, error, res);
                } else {
                    response.status(200, {message:'Регистрация прошла успешно', results}, res);
                }
            })
        }
    });
};


// Авторизация пользователя
exports.signin = (req, res) => {
    db.query("SELECT `id`, `firstname`, `email`, `userpassword` FROM `users2` WHERE `email` = '" + req.body.email +"'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res);
        } else if (rows.length <= 0) {
            response.status(401, {message: `Пользователь с таким email - ${req.body.email} не найден. Пройдите регистрацию`}, res);
        } else {
            const row = JSON.parse(JSON.stringify(rows));
            row.map((rw) => {
                const userpassword = bcryptjs.compareSync(req.body.userpassword, rw.userpassword);
                if (userpassword) {
                    // Если true, то мы пускаем юзера и генерируем токен
                    const token = jwt.sign({
                        userId: rw.id,
                        email: rw.email
                    }, config.JWT, {expiresIn: 120 * 120});

                    response.status(200, {token: `Bearer ${token}`}, res);
                } else {
                    // Выкидываем ошибку, что пароль не верный
                    response.status(401, {message: `Пароль неверный`}, res);
                }
                return true;
            })
        }  
    })
}