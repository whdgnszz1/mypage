module.exports =
    function (app) {
        var db = require('../routes/db');

        var authData = {
            email: 'egoing777@gmail.com',
            password: '111111',
            nickname: 'egoing777'
        };
        var passport = require('passport'),
            LocalStrategy = require('passport-local').Strategy;

        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(function (user, done) {
            console.log('serializeUser', user)
            done(null, user);
        });

        passport.deserializeUser(function (id, done) {
            // db.query(`SELECT * FROM topic`, function (error, topics) {
            done(null, id);
        // })
        });
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pwd'
        },
            function (username, password, done) {
                if (username === authData.email) {
                    if (password === authData.password) {
                        return done(null, authData, {
                            message: 'Welcome.'
                        });
                    } else {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }
                } else {
                    return done(null, false, {
                        message: 'Incorrect username.'
                    });
                }
            }
        ));
        return passport;

    }