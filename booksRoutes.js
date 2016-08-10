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
        book.id = getNextId(books);

        books.push(book);

        res.status(201)
            .json(books);
    });


bookRouter.route('/Books/:bookId').get(function (req, res) {

    var id = req.params.bookId;

    console.log(id);

    var selectedBook = books.filter(function (item) {
        return item.id == id;
    });

    if (selectedBook.length) {
        selectedBook = selectedBook[0];
    }
    else {
        selectedBook = {};
    }

    res.json(selectedBook);

    /*
     Book.findById(req.params.bookId, function(err,book){
     if(err)
     res.status(500).send(err);
     else
     res.json(book);
     });*/
});

bookRouter.route('/Books/:bookId').put(function (req, res) {

    var book = req.body;
    var id = req.params.bookId;


    var selectedBook = books.filter(function (item) {
        return item.id == id;
    });

    if (selectedBook.length) {
        selectedBook = selectedBook[0];
    }
    else {
        selectedBook = null;
    }

    if (selectedBook) {
        selectedBook.title = book.title;
        selectedBook.genre = book.genre;
        selectedBook.author = book.author;
        selectedBook.read = book.read;

        res.status(204)
            .json(books);
    }
    else {

        res.status(404)
            .json(books);
    }
});

bookRouter.route('/Books/:bookId').delete(function (req, res) {
    var id = req.params.bookId;

    var selectedBook = books.filter(function (item) {
        return item.id == id;
    });

    if (selectedBook.length) {
        selectedBook = selectedBook[0];
    }
    else {
        selectedBook = null;
    }

    if (selectedBook) {
        books.splice(books.indexOf(selectedBook),1);
    }

    res.status(204)
        .json(books);
});

function getNextId(data) {

    var nextId = getMaxId(data) + 1;
    console.log('next ', nextId)

    return nextId;

    // return getMaxId(data) + 1;
}

function getMaxId_not_good(books) {
    if (books && books.length > 0) {
        return books[books.length - 1].id;
    }
    return 0;
}


function getMaxId(books) {
    if (books && books.length > 0) {
        var idArray = books.map(function (item) {
            return item.id;
        });

        return maxArrayValue(idArray);
    }

    return 0;
}

function maxArrayValue(array) {
    return Math.max.apply(Math, array);
}

module.exports = bookRouter;
