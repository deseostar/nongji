const router = require('express').Router();
const request = require('request');
var parser = require('xml2json');
var connection = require('../config/database');

const HOST = 'http://pis.rda.go.kr/openApi'
const SERVICE_KEY = '2019a21383c05e19f1bb3384d78b5c5c71df'

var requestUrl = `${HOST}/service.do?apiKey=${SERVICE_KEY}&serviceCode=SVC01&serviceType=AA001&displayCount=10`;

router.get('/list', (req, res) => {
    request.get(requestUrl, (err,res,body) =>{
        if(err){
            console.log(`err => ${err}`)
        }
        else {
            if(res.statusCode == 200){           
                // xml to json
                var jsondata = parser.toJson(body);
                jsondata = eval("("+jsondata+")");
                var items = jsondata.service.list.item;

                // 테이블 초기화
                var sql1 = "DELETE FROM list";
                connection.query(sql1, function (err, result) {
                    if (err) throw err;
                });

                // 파싱데이터 테이블저장
                
                // var sql2 = "INSERT INTO list SET (pestiCode, diseaseUseSeq, cropName, diseaseWeedName, useName, pestiKorName, pestiBrandName, compName, engName, cmpaItmNm, indictSymbl, applyFirstRegDate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                // connection.query(sql2, function (err, result) {
                //     if (err) throw err;    
                // });

                // var sql2 = "INSERT INTO list SET (pestiCode, diseaseUseSeq, cropName, diseaseWeedName, useName, pestiKorName, pestiBrandName, compName, engName, cmpaItmNm, indictSymbl, applyFirstRegDate) VALUES ?";
                // var values = [
                //     [],
                //     [],
                //     []
                // ];

                function bulkInsert(connection, table, objectArray, callback) {
                    let keys = Object.keys(objectArray[0]);
                    let values = objectArray.map( obj => keys.map( key => obj[key]));
                    let sql = 'INSERT INTO list' + table + ' (' + keys.join(',') + ') VALUES ?';
                    connection.query(sql, [values], function (error, results, fields) {
                    if (error) callback(error);
                    callback(null, results);
                    });
                }
                
                bulkInsert(connection, 'my_table_of_objects', objectArray, (error, response) => {
                    if (error) res.send(error);
                    res.json(response);
                });

                for (var i in items) {
                    //console.log(`아이템=> ${items[i]}`)
                    console.log(`질병명=> ${items[i].diseaseWeedName}`)
                }
            }
        }
    });
});

module.exports = router