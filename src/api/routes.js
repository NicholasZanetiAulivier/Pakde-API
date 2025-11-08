const express = require('express');

const router = express.Router();

router.get('/woo', (req, res, next) => {
    return res.send({ woo: "HELLOW WOLRD" });
    next();
})

module.exports = router;