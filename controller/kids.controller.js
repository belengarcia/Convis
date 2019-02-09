const mongoose = require('mongoose');
const Kid = require('../models/kid.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    kid = new Kid(req.body);
    kid.save()
        .then(kid => res.status(201).json(kid))
        .catch(error => next(error))
}
        

module.exports.list = (req, res, next) => {
    Kid.find()
        .then(kids => {
            if(kids) {
                res.json(kids)
            } else {
                throw createError(404, 'Users not found')
            }
        })
        .catch(error => next(error))
}

module.exports.get = (req, res, next) => {
    Kid.findById(req.params.id)
        .then(kid => {
            if(!kid) {
                throw createError(404, 'User not found')
            } else {
                res.json(kid)
            }
        })
}

module.exports.delete = (req, res, enxt) => {
    Kid.findByIdAndDelete(req.params.id)
        .then(kid => {
            if(!kid){
                throw createError(404, 'User not found');
            } else {
                res.status(204).json()
            }
        })
        .catch(error => next(error));
}