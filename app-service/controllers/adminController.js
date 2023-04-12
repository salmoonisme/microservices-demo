const { Response, Error } = require('../middleware/response');
const { Books, Authors } = require('../db/mongo');
const mongoose = require('mongoose');

class AdminController {
  static async getBooks(req, res, next) {
    try {
      const data = await Books.find({})
      if (data.length < 1) {
        throw new Error(400, 'There is no book yet');
      }
      return new Response(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
  static async getBooksbyID(req, res, next) {
    try {
      const data = await Books.findById({
        _id: req.params.id
      })
      if (!data) {
        throw new Error(400, `No book found with ID ${req.params.id}`);
      }
      return new Response(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
  static async getAuthorsbyID(req, res, next) {
    try {
      const data = await Authors.findById({
        _id: req.params.id
      }).populate('books')
      if (!data) {
        throw new Error(400, `No author found with ID ${req.params.id}`);
      }
      return new Response(res, 200, data);
    } catch (error) {
      next(error);
    }
  }
  static async createBooks(req, res, next) {
    try {
      // extract data from req.body
      const { title, authors, publishedAt } = req.body;
      const session = await mongoose.startSession();
      session.startTransaction();
      // create books
      const book = await Books.create ({
        title: title,
        authors: authors,
        publishedAt: publishedAt,
        // avatar: `localhost:${process.env.PORT}/${req.file.path}`
      });
      // check if author already exists
      const authorPromises = authors.map(async (authorName) => {
        const existingAuthor = await Authors.findOne({ name: authorName });
        if (existingAuthor) {
          // if exists just update the book which had been created
          await Authors.findOneAndUpdate(
            { name: authorName },
            { $addToSet: { books: book._id } }
          );
          return existingAuthor;
        } else {
          // if not make new author
          const newAuthor = await Authors.create({
            name: authorName,
            books: [book._id]
          })
          return newAuthor;
        }
      });
      await session.commitTransaction();
      session.endSession();

      return new Response(res, 201, book);
    } catch (error) {
      next(error);
    }
  }
  static async deleteBooks(req, res, next) {
    try {
      const data = await Books.findOneAndDelete({
        _id: req.params.id
      })
      if(!data) {
        return new Error(404, 'Book not found')
      }
      return new Response(res, 200, 'Book deleted successfully')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AdminController;
