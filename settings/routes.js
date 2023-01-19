'use strict'

module.exports = (app) => {
    // const indexController = require('../controller/IndexController');
    const passport= require('passport');
    const usersController = require('../controller/UsersController');
    const postsController = require('../controller/PostsController');

    // Маршрут регистрации пользователя
    app
    .route('/api/auth/signup')
    .post(usersController.signup);

    // Маршрут авторизации зарегистрированного пользователя
    app
    .route('/api/auth/signin')
    .get(usersController.signin);

    // Маршрут выборки всех пользователей
    app
        .route('/api/users2')
        .get(passport.authenticate('jwt', { session: false }), usersController.getAllUsers);
    app
        .route('/api/posts')
        .get(passport.authenticate('jwt', { session: false}), postsController.getPosts);
}