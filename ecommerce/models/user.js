const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidvi = require('uuid/v1');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 35
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 35,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

//virtual fields 
userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidvi();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {

    validatePassword : function(plainPassword){
        return this.encryptPassword(plainPassword) === this.hashed_password;
    },

    encryptPassword: function (password) {
        
        if (!password) return '';

        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (ex) {
            return '';
        }
    }
}

module.exports = mongoose.model('User', userSchema);