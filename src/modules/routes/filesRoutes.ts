export {};

const express = require('express');
const router = express.Router();

const {
  getFiles,
  saveFiles,
  deleteFiles,
} = require('../controllers/files.controllers');

router.get('/files', getFiles);
router.post('/files', saveFiles);
router.delete('/files', deleteFiles);

module.exports = router;
