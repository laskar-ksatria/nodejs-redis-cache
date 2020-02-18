const mongoose = require('mongoose');

const { hashPass } = require('../helpers/hashPassword');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty']
  },
  email: {
        type: String,
        validate: [{
            validator: function (email) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
            },
            message: props => `${props.value} is not valid email format`
        },
        {
            validator: function (value) {
                return this.model('User').findOne({email: value})
                .then(function (email) {
                    if (email) {
                        return false
                    }else {
                        return true
                    }
                })
            },
            message: props => `${props.value} already taken, please take another one`
        }
    ],
        required: [true, 'Email is required']
    },
  password: {
    type: String,
    required:[true, 'Password cannot be empty']
  }
})



const user = mongoose.model('User', UserSchema);

module.exports = user;







