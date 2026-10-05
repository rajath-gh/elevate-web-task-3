# Task 3: Books REST API (Node.js + Express)

Simple REST API with CRUD operations on books. Data is stored in memory (no database).

## Setup
```bash
npm install
npm start
```
Server runs at `http://localhost:3000`.

## Endpoints
| Method | Endpoint     | Description        | Success |
|--------|--------------|--------------------|---------|
| GET    | /books       | Get all books      | 200     |
| GET    | /books/:id   | Get one book       | 200     |
| POST   | /books       | Add a new book     | 201     |
| PUT    | /books/:id   | Update a book      | 200     |
| DELETE | /books/:id   | Delete a book      | 200     |

Errors: `400` invalid input, `404` not found.

## Example
POST `/books`
```json
{ "title": "Clean Code", "author": "Robert C. Martin" }
```

## Tools
Node.js, Express, VS Code, Postman

## What I did
Initialized the project with `npm init`, installed Express, built the CRUD routes using an in-memory array, and tested every endpoint in Postman (screenshots in `/screenshots`).