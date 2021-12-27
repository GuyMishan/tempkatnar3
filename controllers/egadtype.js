const Egadtype = require('../models/egadtype');


exports.egadtypeById = (req, res, next, id) => {
    Egadtype.findById(id).exec((err, egadtype) => {
        if(err || !egadtype) {
            return res.status(400).json({
                error:"האגד לא נמצא"
            })
        }
        req.egadtype = egadtype
        next()
    })
}
exports.create = (req, res) => {
    const egadtype = new Egadtype(req.body)
    egadtype.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error:err
            })
        }
        res.json({ data });
    })

}

exports.read = (req, res) => {
    return res.json(req.egadtype);
}

exports.remove = (req, res) => {
    const egadtype = req.egadtype
    egadtype.remove((err, deletedEgadtype) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message:"האגד נמחק בהצלחה"
        })
       
    })
}

exports.update = (req, res) => {
    const egadtype = req.egadtype
    egadtype.name = req.body.name
    egadtype.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error:err
            })
        }
        res.json( data );
    })

}
exports.list = (req, res) => {
 Egadtype.find().exec((err, data) => {
    if(err) {
        return res.status(400).json({
            error: err
        })
    }
    res.json(data)
 })
}