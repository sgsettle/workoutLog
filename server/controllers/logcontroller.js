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
  
  const logFromRequest = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner_id: req. body.owner_id
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
  Log.update(req.body, {
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