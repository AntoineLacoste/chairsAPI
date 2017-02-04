var express    = require('express');
var app        = express();
var db         = require('./config/db');
var bodyParser = require('body-parser');
var Chair      = require('./model/chairModel');
var paiment    = require('./middlewares/paiment.js');
var stock      = require('./middlewares/stock.js');
var cors       = require('cors');

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use(cors());

router.get('/chairs', function (req, res) {
    Chair.find({}).then(function (chairs) {
        res.json({ data: chairs});
    }, function (err) {
        console.log(err);

        res.send(err);
    })
});

router.get('/chairs/:chair_id', function (req, res) {
    Chair.find({reference: req.params.chair_id}).then(function (chair) {
        res.json({ data: chair});
    }, function (err) {
        res.send(err);
    })
});

router.post('/paiment', stock, paiment, function (req, res) {
    console.log('before res');
    res.json({
        message: req.message,
        valid: req.valid
    });
});

app.use('/api', router);

app.listen(1337, function () {
    console.log('Server running');
});
