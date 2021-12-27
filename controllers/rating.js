const Rating = require('../models/rating');

exports.find = (req, res) => {
    Rating.find().sort({tipuldate: 'descending'})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
}
exports.create = (req, res) => {
    const rating = new Rating(req.body)
    rating.save((err,data) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(data)
    })
 }