// ,
//     mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost/bookAPI');
// var connectionString = 'mongodb://bears-user:bEar78gg32akkl8@ds145355.mlab.com:45355/bears-rest';
// var db = mongoose.connect(connectionString);
// var Book = require('./models/bookModel');


var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var books = require('./books');

var bookRouter = require('./booksRoutes')


app.use('/api', bookRouter);


app.get('/', function (req, res) {
    res.send('welcome to my API!');
});

app.listen(port, function () {
    console.log('app is running on PORT: ' + port);
});