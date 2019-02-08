const mongoose = require('mongoose');

const kidSchema = new mongoose.Schema({
    name: {
        type: String,
        required: '¿La niña no tiene nombre?'
    },
    surname: String,
    school: {
        type: String,
        required: '¿A qué colegio va?'
    },
    allergies: [String],
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    convis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Convi'
    }]
}, {timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Kid = mongoose.model('Kid', kidSchema);
module.exports = Kid;