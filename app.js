var express    = require('express');
var app        = express();
var db         = require('./config/db');
var bodyParser = require('body-parser');
var Chair      = require('./model/chairModel');

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/chairs', function (req, res) {
    Chair.find({}).then(function (chairs) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({ data: chairs});
    }, function (err) {
        res.send(err);
    })
});

router.get('/chairs/:chair_id', function (req, res) {
    Chair.find({reference: req.params.chair_id}).then(function (chair) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({ data: chair});
    }, function (err) {
        res.send(err);
    })
});

app.use('/api', router);

app.listen(1337, function () {
    console.log('Server running');
});
