import express from 'express';
import bodyParser from 'body-parser';
// index.js
const app = express();
const PORT = 3000;

app.use(express.json()); // middleware to parse JSON

// In-memory book list
let books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// GET all books
app.get('/', (req, res) => {
  res.send(books);
});

// POST a new book
app.post('/', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update a book by ID
app.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// DELETE a book by ID
app.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  res.status(204).send(); // 204 No Content
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
