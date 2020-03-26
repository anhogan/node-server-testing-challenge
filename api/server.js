const express = require('express');
const helmet = require('helmet');

const Dogs = require('../dogs/dogs-model');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/dogs', (req, res) => {
  Dogs.find()
    .then(dogs => {
      res.status(200).json(dogs);
    })
    .catch(error => {
      res.status(500).json({ message: "The dog information could not be retrieved", error });
    });
});

server.post('/dogs', (req, res) => {
  Dogs.add(req.body)
    .then(dog => {
      res.status(201).json(dog);
    })
    .catch(error => {
      res.status(500).json({ message: "The dog could not be created", error });
    });
});

server.put('/dogs/:id', (req, res) => {
  Dogs.update(req.params.id, req.body)
    .then(count => {
      if (count > 0) {
        Dogs.findById(req.params.id)
          .then(dog => {
            res.status(200).json(dog);
          })
          .catch(error => {
            res.status(500).json({ message: "The dog information could not be retrieved", error });
          });
      };
    })
    .catch(error => {
      res.status(500).json({ message: "The dog could not be updated", error });
    });
});

server.delete('/dogs/:id', (req, res) => {
  Dogs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        Dogs.find()
          .then(dogs => {
            res.status(200).json(dogs);
          })
          .catch(error => {
            res.status(500).json({ message: "The dog information could not be retrieved", error });
          });
      };
    })
    .catch(error => {
      res.status(500).json({ message: "The dog could not be deleted", error });
    });
});

module.exports = server;