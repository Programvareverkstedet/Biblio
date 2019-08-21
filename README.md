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
