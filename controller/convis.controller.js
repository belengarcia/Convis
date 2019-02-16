const mongoose = require('mongoose');
const Convi = require('../models/convis.model')

module.exports.create = (req, res, next) => {
    convi = new Convi(req.body)
    convi.save()
        .then(convi => res.status(201).json(convi))
        .catch(error => next(error))
}

module.exports.list = (req, res, next) => {
    Convi.find()
        .then(convis => 
            {if(convis) {
                res.json(convis)
            } else {
                throw createError(404, 'Convivencia no encontrada')
            }
        })
        .catch(error => next(error))
}

module.exports.get = (req, res, next) => {
    Convi.findById(req.params.id)
        .then(convi => {
            if (convi) {
                res.json(convi)
            } else {
                throw createError(404, 'Convivencia no encontrada')
            }
        })
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    Convi.findByIdAndDelete(req.params.id)
        .then(convi => {
            if(convi) {
                res.status(204).json()
            } else {
                throw createError(404, 'Convivencia no encontrada')
            }
        })
}

module.exports.update = (req, res, next) => {
    changes = {
        title: req.body.title,
        description: req.body.description,
        loaction: req.body.location,
        date: req.body.date,
        price: req.body.price
    }

    Convi.findByIdAndUpdate(req.params.id, {$set : changes}, { new: true, runValidators: true })
        .then(convi => {
            if(!convi) {
                throw createError(404, 'User not found')
            } else {
                res.json(convi)
            }
        })
        .catch(error => next(error))
}