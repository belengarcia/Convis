const mongoose = require('mongoose');
const constants = require('../constants');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'User Name is required'
    },
    mail: {
        type: String,
        required: 'email is required',
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'Password is mandatory'
    },
    profilePic: {
        type: String,
        required: true,
        default: 'https://png2.kisspng.com/20180508/ozq/kisspng-user-computer-icons-system-chinese-wind-title-column-5af1427fd3ab48.378455571525760639867.png'
    },
    role: {
        type: String,
        enum: [constants.ROLE_USER, constants.ROLE_ADMIN],
        default: constants.ROLE_USER
    },
    kids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kid'
    }]

}, {timestamps: true,     
    toJSON: {
    transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
        }   
    }   
});    

userSchema.pre('save', function save(next){
    const user = this;
    if(!user.isModified('password')) {
        next();
    } else {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(user.password, salt)
            })
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(error => next(error));
    }
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
