const express = require('express');
const router = express.Router()

const { create, find, update, remove, read, tipulById,findtipulsbyuser,settipulstatusdeleted,getactivetipuls,gettipulsbydate,getallactivetipulsbyegadtypeid,getalltipulsbyegadtypeid,gettipulsbydatebyegadtype} = require('../controllers/tipul');
const { userById} = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { tipulmakingValidator } = require('../validator');
// find spec tipul
router.get('/tipul/:tipulId', read)

// post a tipul
router.post('/tipul/create/:userId',requireSignin,isAuth,tipulmakingValidator,create);

router.put('/tipul/:tipulId/:userId',requireSignin,isAuth,isAdmin, update )

router.delete('/tipul/:tipulId/:userId',requireSignin,isAuth,isAdmin, remove )

router.get('/tipuls', find)
router.get('/tipulsbyuser/:userId',findtipulsbyuser)


router.get('/tipuls/getallactivetipuls', getactivetipuls);
router.post('/tipul/settipulstatusdeleted/:tipulId',settipulstatusdeleted);

router.post('/tipuls/getallactivetipulsbyegadtypeid', getallactivetipulsbyegadtypeid)

router.post('/tipuls/getalltipulsbyegadtypeid', getalltipulsbyegadtypeid)

router.post('/tipuls/gettipulsbydate', gettipulsbydate);

router.post('/tipuls/gettipulsbydatebyegadtype', gettipulsbydatebyegadtype);

//router.post('/tipul/specificdateschedule/:date',getspecificdatetipuls);

router.param("userId", userById)
router.param("tipulId", tipulById)

module.exports = router;

