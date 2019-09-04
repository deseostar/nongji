var router = require('express').Router();

var mysql = require('mysql');
var connection = require('../config/database');

router.post('/pesticide', (req, res) => {
    const {pestiCode, diseaseUseSeq, cropName, diseaseWeedName, useName, pestiKorName, pestiBrandName, compName, engName, cmpaItmNm, indictSymbl, applyFirstRegDate} = req.body;

    connection.query("SELECT * FROM nongji WHERE diseaseWeedName=?", items[i], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(JSON.stringify(results));
        }    
    });
});


module.exports = router;