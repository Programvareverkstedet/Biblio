# Biblio
RESTful API for PVV's library system (BiblI/Otek).

It's about time I put this up somewhere.

Currently assumes a running local MongoDB instance called "ils", with a password-protected admin user "ils_operator".

To run, type:

```
npm install
npm start [password]
```

ExpressJS is used for routing, bcrypt is used for passwords, mongoose is used to interface with MongoDB.

HATEOAS isn't implemented yet.

In lieu of Swagger:

```
GET /books: List all books in library.
POST /books: Add a book to the library. 

GET /books/:bookId : Get specific entry for a book.
PUT /books/:bookId : Requires update_books permission. Updates entry for book.
DELETE /books/:bookId : Requires delete_books permission. Deletes entry for book.

GET /users: List all users in library.
POST /users: Requires add_users permission. Add a user to the system. If any non-default permissions are needed, change_permissions is required.

GET /users/:userId : Get specific user entry.
PUT /users/:userId : Requires update_users permission. Updates user entry.
DELETE /users/:userId : Requires delete_users permission. Deletes user. Not allowed if user is currently borrowing any books.

GET /borrow: Requires borrow_books permission. Lists logged in user's borrowed books. 
PUT /borrow: Borrows a book, sent in the format { bookId: [id] }.
DELETE /borrow: Deletes a book, sent in the format { bookId: [id] }.
```
