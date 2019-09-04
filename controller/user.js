var router = require('express').Router();

var mysql = require('mysql');
var jwt = require('jsonwebtoken');

var connection = require('../config/database');
var auth = require('./authcheck');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const{
        email,
        password
    } = req.body;
    const secret = req.app.get('jwt-secret');

    var query = "SELECT * FROM user WHERE email = ?";

    connection.query(query, [email], function(error, results) {
        if (results.length == 0) {
            console.log('email 또는 password가 맞지 않습니다.');
            onError('email 또는 password가 맞지 않습니다.');
            return;
        }
        console.log(results[0]);
        if (results[0].password == password) {
            jwt.sign({
                userName: results[0].name,
                userId: results[0].id,
                email: results[0].email
                },
                secret, {
                    expiresIn: '1d',
                    issuer: 'nongji.admin',
                    subject: 'user.login.info'
                },
                (err, token) => {
                    console.log('로그인 성공', token)
                    res.json(token)
                }
            )
        } else {
            console.log('password가 맞지 않습니다.');
            onError('password가 맞지 않습니다.');
        }
    });

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }
}); 

router.get('/authcheck', auth, (req, res) => {
    res.json(req.decoded);
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/join', (req, res) => {
    const {name, email, password, phone} = req.body;

    var query = "INSERT INTO user (name, email, password, phone) VALUES(?, ?, ?, ?)";
    connection.query(query, [name, email, password, phone], (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            console.log("result:" + results);
            res.json(1);
        }
    });
});

router.get('/list', (req, res) => {
    connection.query('SELECT * FROM user', function (error, results) {
      if (error) throw error;
      res.json(results);
    });
});

router.post('/myinfo', (req, res) => {
    console.log(req);
    const {email} = req.body;
    connection.query('SELECT * FROM user WHERE email=?', [email], function (error, results) {
      if (error) throw error;
      res.json(results);
    });
});


module.exports = router;