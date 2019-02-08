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
    status: false,
    payed: Number,
    topay: Number
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