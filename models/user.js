const mongoose = require("mongoose");
const { hashPass } = require('../helpers/hashPassword');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    min: [true, 'Name must be between 2 to 30 chars']
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
    required: [true, 'Password cannot be empty'],
    min:[6, 'Password must have 6 chars']
  },
  avatar: {
    type: String
  },
  account: [{ 
    type: Schema.Types.ObjectId, ref: "Account" 
  }],
  id_country: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function (next) {
  let pass = hashPass(this.password);
  this.password = pass;
  next();
})


const User = mongoose.model("User", UserSchema);

module.exports = User;