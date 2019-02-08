const mongoose = require('mongoose');

const conviSchema = new mongoose.Schema({
    title: {
        type: String,
        required: '¿Cómo se llama la convivencia?'
    },
    description: {
        type: String,
        required: '¿Qué vamos a hacer'
    },
    date: Date,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    img: [String],
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee'
    }]

}, {timestamps: true,
toJSON: {
    transform: (doc, ret) => {
        ret.id= doc._id;
        ret.location.coordinates = doc.location.coordinates;
        delete ret.location;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
}
});

const Convi = mongoose.model('Convi', conviSchema);
module.exports = Convi;