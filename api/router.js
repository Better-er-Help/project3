const router = require('express').Router();
const Paws = require('../models/books');

router.get('/api/books', (req,res) => {
    Paws.find({})
    .then( pawsDB => {
        res.json(pawsDB);
      })
    .catch((err) => {
        res.json(err);
      });
})

router.post('/api/books', (req,res) => {
    Paws.create({})
    .then( r => {
        res.json(r);
      })
    .catch( err => {
        res.json(err)
      })
})

module.exports = router