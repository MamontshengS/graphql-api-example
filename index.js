const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
 type Book {
    id: ID!
    title: String!
    author: String!
 }

 type Query {
    books: [Book!]
 }

 type Mutation {
    addBook(title: String!, author: String!): Book!
    updateBook(id: ID!, title: String!, author: String!): Book!
    deleteBook(id: ID!): Book!
 }
`;
const books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
    },
    {
      title: 'Wuthering Heights',
      author: 'Emily Brontë',
    },
  ];

const resolvers = {
 Query: {
    books: () => books,
 },
 Mutation: {
    addBook: (_, { title, author }) => {
      const newBook = { id: String(books.length + 1), title, author };
      books.push(newBook);
      return newBook;
    },
    updateBook: (_, { id, title, author }) => {
      const bookIndex = books.findIndex(book => book.id === id);
      if (bookIndex === -1) throw new Error('Book not found');

      books[bookIndex] = { id, title, author };
      return books[bookIndex];
    },
    deleteBook: (_, { id }) => {
      const bookIndex = books.findIndex(book => book.id === id);
      if (bookIndex === -1) throw new Error('Book not found');

      const deletedBook = books.splice(bookIndex, 1)[0];
      return deletedBook;
    },
 },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
 console.log(`Server ready at ${url}`);
});