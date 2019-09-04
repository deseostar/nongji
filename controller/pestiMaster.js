const router = require('express').Router();
const request = require('request');
var parser = require('xml2json');

const callDoProc = async (requestUrl) => {
    return new Promise((relsolve, reject) => {
      try {
        request.get(requestUrl, (err,res,body) =>{
            if(err){
                console.log(`err => ${err}`)
            }
            else {
                if(res.statusCode == 200){           
                    // xml to json
                    var jsondata = parser.toJson(body);
                    jsondata = eval("("+jsondata+")");
                    if (!jsondata.service.list) {
                        reject('error')
                    } else {
                        const list = jsondata.service.list.item;
                        const realtimeList = JSON.stringify(list);
                        relsolve(realtimeList)
                    }
                }
            }
        });
      } catch(error) {
        reject(error)
      }
    });
  }

app.post('/pestiMaster', function(req, res) {
    const HOST = 'http://pis.rda.go.kr/openApi'
    const SERVICE_KEY = 'sorry'

    const item = req.body;
    let condition = '';
    if (item.cropName && item.cropName.length > 0) {
        condition += '&cropName=' + encodeURIComponent(item.cropName);
    }

    if (item.diseaseWeedName && item.diseaseWeedName.length > 0) {
        condition += '&diseaseWeedName=' + encodeURIComponent(item.diseaseWeedName);
    }

    if (item.useName && item.useName.length > 0) {
        condition += '&useName=' + encodeURIComponent(item.useName);
    }

    var requestUrl = `${HOST}/service.do?apiKey=${SERVICE_KEY}&serviceCode=SVC01&serviceType=AA001&displayCount=10` + condition;
    callDoProc(requestUrl)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.send("[]");
    })
});

module.exports = router