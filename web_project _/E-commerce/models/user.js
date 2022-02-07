const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    RetailerorConsumer: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Address: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },    
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]

});


userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);

module.exports = User;