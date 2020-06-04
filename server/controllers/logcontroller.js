const router = require('express').Router()
const Log = require('../db').import('../models/log');

// GET
router.get('/', (req, res) => {
  Log.findAll()
  .then(log => res.status(200).json({
    log: log
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// POST 
router.post('/', (req, res) => {
  console.log(req.body);
  
  const logFromRequest = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id
  }

  Log.create(logFromRequest)
  .then(log => res.status(200).json({
    log: log
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// QUERY BY ID
router.get('/:id', (req, res) => {
  Log.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(log => res.status(200).json({
    log: log
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// UPDATE
router.put('/:id', (req, res) => {
  Log.update(req.body.log, {
    where: {
      id:req.params.id
    }
  })
  .then(log => res.status(200).json({
    log: log
  }))
  .catch(err => res.status(500).json({
    error: err
  }))
})

// DELETE
router.delete('/:id', (req, res) => {
  Log.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(log => res.status(200).json({
      log: log
  }))
  .catch(err => res.status(500).json({
      error: err
  }))
})

module.exports = router;