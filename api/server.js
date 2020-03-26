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

server.post('/dogs', validateDog, (req, res) => {
  Dogs.add(req.body)
    .then(dog => {
      res.status(201).json(dog);
    })
    .catch(error => {
      res.status(500).json({ message: "The dog could not be created", error });
    });
});

server.put('/dogs/:id', validateID, (req, res) => {
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

server.delete('/dogs/:id', validateID, (req, res) => {
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

function validateID(req, res, next) {
  Dogs.findById(req.params.id)
    .then(dog => {
      if (!dog) {
        res.status(404).json({ message: "Invalid dog id" });
      } else {
        next();
      };
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The dog information could not be retrieved" });
    });
};

function validateDog(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Missing dog data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Each dog must have a name" });
  } else {
    next();
  };
};

module.exports = server;