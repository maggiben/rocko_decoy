const express = require('express');
const router = express.Router();

// Import the specific routers
const loanRouter = require('./loan');


router.use('/', loanRouter);

module.exports = router;
