export {};

const express = require('express');
const router = express.Router();

const {
  getFiles,
  saveFiles,
} = require('../controllers/files.controllers');

router.get('/files', getFiles);
router.post('/files', saveFiles);

module.exports = router;
