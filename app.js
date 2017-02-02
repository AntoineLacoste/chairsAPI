var express    = require('express');
var app        = express();
var db         = require('./config/db');
var bodyParser = require('body-parser');
var Chair      = require('./model/chairModel');
var paiment    = require('./middlewares/paiment.js');
var stock      = require('./middlewares/stock.js');
var User       = require('./model/userModel');

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
        console.log(chairs);
        res.json({ data: chairs});
    }, function (err) {
        console.log(err);

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

router.post('/paiment', stock, paiment, function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.json({
        message: req.message,
        valid: req.valid
    });
});

router.post('/login', function (req, res) {
    User.find({'login': req.body.login}).then(function (users) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        var user = users[0];

        if(user.validPassword(req.body.password)){
            console.log('valid');
            res.json({
                message: "credentials valid",
                valid: true
            });
        }
        else{
            console.log('pas valid');
            res.json({
                message: "invalid credentials",
                valid: false
            });
        }
    }, function (err) {
        console.log(err);
    });

    res.json({
        message: req.message,
        valid: req.valid
    });
});

app.use('/api', router);

app.listen(1337, function () {
    console.log('Server running');
});