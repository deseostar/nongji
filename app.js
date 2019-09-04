var express = require('express');
var cors = require('cors');
const config = require('./config/config');

// const database = require('./config/database');
//const xxx = require('./controller/pesticide.js'); 상세 실시간 넘기기

app = express();
var http = require('http').createServer(app);

var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors()); 

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build/contracts'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('jwt-secret', config.jwt_secret)

app.use('/scraping', require('./controller/scraping.js'));
app.use('/pesticide', require('./controller/pesticide.js'));
app.use('/user', require('./controller/user'));

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/dblookup', require('./controller/dblookup.js'));
app.use('/realtime1', require('./controller/realtime1.js'));
app.use('/realtime2', require('./controller/realtime2.js'));
app.use('/pestiMaster', require('./controller/pestiMaster.js'));

//const xx = require('./controller/pesticide.js')
//const data xx
//res.send(data)

http.listen(port);
console.log('Listening on port ', port);