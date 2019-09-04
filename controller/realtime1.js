const router = require('express').Router();
const request = require('request');
var parser = require('xml2json');


app.get('/', function(req, res) {
    const HOST = 'http://pis.rda.go.kr/openApi'
    const SERVICE_KEY = '2019a21383c05e19f1bb3384d78b5c5c71df'

    var requestUrl = `${HOST}/service.do?apiKey=${SERVICE_KEY}&serviceCode=SVC01&serviceType=AA001&displayCount=10`;

    request.get(requestUrl, (err,res,body) =>{
        if(err){
            console.log(`err => ${err}`)
        }
        else {
            if(res.statusCode == 200){           
                // xml to json
                var jsondata = parser.toJson(body);
                jsondata = eval("("+jsondata+")");
                const realtimeList = JSON.stringify(jsondata);
                res.send(realtimeList);
            }
        }
    });
});

module.exports = router