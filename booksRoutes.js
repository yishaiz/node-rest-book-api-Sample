var express = require('express');

var books = require('./books');


var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function (req, res) {

        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        res.json(books);

        // Book.find(query, function(err,books){
        //     if(err)
        //         res.status(500).send(err);
        //     else
        //         res.json(books);
        // });
    })

   .post(function (req, res) {

        // var book = new Book(req.body);
        //book.save();

        var book = req.body;
        books.push(book);

        res. status(201)
            .json(books);
    });


bookRouter.route('/Books/:bookId')
    .get(function (req, res) {

        var title = req.params.bookId;
        console.log(title);
        var selectedBook = books.filter(function (item) {
            return item.title == title;
        });

        res.json(selectedBook);

        /*
         Book.findById(req.params.bookId, function(err,book){
         if(err)
         res.status(500).send(err);
         else
         res.json(book);
         });*/
    });


module.exports = bookRouter;
