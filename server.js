const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: parse JSON request bodies
app.use(express.json());

// In-memory storage
let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' },
];
let nextId = 3;

// GET /books - all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// GET /books/:id - single book
app.get('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.status(200).json(book);
});

// POST /books - add a book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' });
  }
  const book = { id: nextId++, title, author };
  books.push(book);
  res.status(201).json(book);
});

// PUT /books/:id - update a book
app.put('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { title, author } = req.body;
  if (!title && !author) {
    return res.status(400).json({ error: 'Provide title and/or author' });
  }
  if (title) book.title = title;
  if (author) book.author = author;
  res.status(200).json(book);
});

// DELETE /books/:id - remove a book
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const [deleted] = books.splice(index, 1);
  res.status(200).json({ message: 'Book deleted', book: deleted });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error-handling middleware (e.g. invalid JSON)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});