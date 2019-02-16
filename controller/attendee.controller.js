const mongoose = require('mongoose');
const Attendee = require('../models/attendee.model');


module.exports.create = (req, res, next) => {
    attendee = new Attendee({
        kid: req.body.kidId, //en el front pasar el id (selector de kis asociado al parent)
        parent: req.user.id,
        convi: req.params.id
    })

    attendee.save()
        .then(attendee => res.status(201).json(attendee))
        .catch(error => next(error))

    //aquí se tendrá que enviar en algún momento el mail a dirección
}

module.exports.list = (req, res, next) => {
    Attendee.find({convi: req.params.id})
        .then(attendees => {
            if(!attendees) {
                throw createError(404, 'No hay reservas')
            } else {
                res.json(attendees)
            }
        })
}

module.exports.get = (req, res, next) => {
    Attendee.findById(req.params.attendeeId)
        .then(attendee => {
            if(attendee){
                res.json(attendee)
            } else {
                throw createError(404, 'Sin información de reserva')
            }
        })
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    Attendee.findByIdAndDelete(req.params.attendeeId)
        .then(attendee => {
            if(attendee) {
                res.status(204, 'Reserva eliminada')
            } else {
                throw createError(404, 'No hay información de reserva')
            }
        })
        .catch()
}

module.exports.updateAccept = (req, res, next) => {
    Attendee.findById(req.params.attendeeId)
        .then(attendee => {
            if(!attendee){
                throw createError(404, 'attendee not found')
            } else {
                const newAccept = !attendee.accepted;

                attendee.set({ "status": newAccept });
                attendee.save()
                .then(() => {
                    res.json(attendee)
                })
                .catch(error => next(error));
            }
        })

        .catch(error => next(error));
}