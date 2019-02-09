const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
    kid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kid'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    convi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Convi'
    },
    accepted: false, //confirmar por admin
    status: false, //actualemente no activo (paypal)
    payed: Number, //actualemente no activo (paypal)
    topay: Number  //actualemente no activo (paypal)
}, {timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
            }   
        }  
});

const Attendee = mongoose.model('Attendee', attendeeSchema);
module.exports = Attendee;