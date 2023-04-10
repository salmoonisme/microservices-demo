// The GraphQL schema
const typeDefs = `#graphql
  type Book {
    id: ID
    title: String
    author: [Author]
    year: Int
  }
  type Author {
    id: ID
    name: String
    book: [Book]
  }
  type Query {
    hello: String
  }
  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }
  
  type Mutation {
    addBook(title: String!, authorIds: [ID!]!, year: Int!): Book
    addAuthor(name: String!): Author
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

module.exports = { typeDefs, resolvers }