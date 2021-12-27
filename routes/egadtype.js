const express = require('express');
const router = express.Router()

const {create, remove, update, read, list, egadtypeById} = require('../controllers/egadtype');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById } = require("../controllers/user");


router.get('/egadtypes', list)
router.get('/egadtype/:egadtypeId', read)
router.post('/egadtype/create/:userId',requireSignin,isAuth,isAdmin ,create);
router.delete('/egadtype/:egadtypeId/:userId',requireSignin,isAuth,isAdmin, remove )
router.put('/egadtype/:egadtypeId/:userId',requireSignin,isAuth,isAdmin, update )





router.param("egadtypeId", egadtypeById)
router.param("userId", userById)



module.exports = router