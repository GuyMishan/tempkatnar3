const Tipul = require('../models/tipul');
const formidable = require('formidable');
const _ = require('lodash'); //helps update the product
const fs = require('fs');

exports.tipulById = (req, res, next, id) => {
    Tipul.findById(id).exec((err, tipul) => {
        if(err || !tipul) {
            return res.status(400).json({
                error:"הפריט לא נמצא"
            })
        }
        req.tipul = tipul
        next()
    })
  }

exports.find = (req, res) => {
    Tipul.find().sort({tipuldate: 'descending'})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
}

    exports.create = (req, res) => {
       const tipul = new Tipul(req.body)
       tipul.save((err,data) => {
           if(err) {
               return res.status(400).json({
                   error: err
               })
           }
           res.json(data)
       })
    }

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields) => {
        if(err){
            return res.status(400).json({
                error:'לא ניתן להעלות את התמונה'
            })
        }
        /* const {tipuldate,cartype,tipultype,egadtype,carnum } = fields
        if(!tipuldate || !cartype  || !tipultype || !egadtype || !carnum   ) {
            return res.status(400).json({
                error: "כל השדות נדרשים"
            })
        } */
        let tipul = req.tipul;
        tipul = _.extend(tipul,fields);
        // if(files.photo){
        //     if (files.photo.size > 100000) {
        //         return res.status(400).json({
        //             error: "התמונה צריכה לשקול פחות מ 1 מגה ביט"
        //         })
        //     }
        //     // console.log('FILES PHOTO:', files.photo)
        //     product.photo.data = fs.readFileSync(files.photo.path)
        //     product.photo.contentType = files.photo.type
        // }
        tipul.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({ result });
        })

 }) 

}

exports.remove = (req, res) => {
    let tipul = req.tipul
    tipul.remove((err, deletedTipul) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message:"הטיפול נמחק בהצלחה"
        })
       
    })
}
exports.read = (req, res) => {
    return res.json(req.tipul);
}

exports.findtipulsbyuser = (req, res) => {
    String.prototype.toObjectId = function() {
        var ObjectId = (require('mongoose').Types.ObjectId);
        return new ObjectId(this.toString());
      };
    Tipul.find({user:(req.params.userId).toObjectId()}).sort({tipuldate: 'descending'})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.settipulstatusdeleted = (req, res) => {
    Tipul.updateOne({_id: req.tipul._id},{ status: "נמחק" })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));;
}

exports.getactivetipuls = (req, res) => {
    Tipul.find({ status: { $ne: "נמחק" } }).sort({tipuldate: 'descending'})
    .populate({ path: 'user', select: 'name -_id' })
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
}

/*exports.schedulertipuls = (req, res) => {
    var senddata = [];

     Tipul.find().exec(function(err, data){
         //set id property for all records
         for (var i = 0; i < data.length; i++)
         {
             var tipul
            var temptipuldate=data[i].tipuldate;
            //var temptipuldate=data[i].tipuldate.substring(0,10)+"14:00";
            senddata.push({id:data[i]._id,start_date:temptipuldate,end_date:temptipuldate});
          //  senddata[i].text="hello";
         }res.send(senddata);
        });
    }*/

exports.gettipulsbydate = (req, res) => { //req.body={ day: 14, month: 12, year: 2020 } might need to be optimized
    Tipul.find().exec(function (err, data) {
        var senddata = [];
        for (var i = 0; i < data.length; i++) {
            var myDate = new Date(data[i].tipuldate);
            if ((myDate.getDate() == req.body.day) && ((myDate.getMonth() + 1) == req.body.month) && (myDate.getFullYear() == req.body.year)) {
                senddata.push(data[i]);
            }
        } res.send(senddata);
    });
}

exports.getallactivetipulsbyegadtypeid = (req, res) => {
    console.log(req.body.egadtypeid);
    Tipul.find({status: { $ne: "נמחק" },egadtypeid: req.body.egadtypeid}).sort({tipuldate: 'descending'})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.getalltipulsbyegadtypeid = (req, res) => {
    console.log(req.body.egadtypeid);
    Tipul.find({egadtypeid: req.body.egadtypeid}).sort({tipuldate: 'descending'})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
}

exports.gettipulsbydatebyegadtype = (req, res) => { //req.body={ day: 14, month: 12, year: 2020 } might need to be optimized
console.log(req.body);
    Tipul.find({egadtypeid: req.body.user.egadtypeid}).exec(function (err, data) {
        var senddata = [];
        for (var i = 0; i < data.length; i++) {
            var myDate = new Date(data[i].tipuldate);
            if ((myDate.getDate() == req.body.date.day) && ((myDate.getMonth() + 1) == req.body.date.month) && (myDate.getFullYear() == req.body.date.year)) {
                senddata.push(data[i]);
            }
        } res.send(senddata);
    });
}