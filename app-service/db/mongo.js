const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BooksSchema = new Schema ({
    title: String,
    authors: [String],
    publishedAt: {
        type: Number,
        min: 1800,
        max: 2100
    },
    avatar: String
});

const AuthorsSchema = new Schema({
    name: String,
    books: [{ type: Schema.Types.ObjectId, ref: 'Books' }]
  });

const Books = mongoose.model('Books', BooksSchema);
const Authors = mongoose.model('Authors', AuthorsSchema);

module.exports = { Books, Authors };