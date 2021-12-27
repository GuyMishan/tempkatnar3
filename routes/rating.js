const express = require('express');
const router = express.Router()
const { create,find} = require('../controllers/rating');
const { userById} = require("../controllers/user");

router.get('/rateing/:tipulId', find)
router.post('/rating/create/:userId',create);

router.param("userId", userById)


module.exports = router;