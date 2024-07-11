
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =require('bcryptjs');
const crypto =require('crypto');

const userSchema = mongoose.Schema({
  name: {
     type: String,
      required: true
     },
  email: { type: String,
     required: true,
     unique: true 
    },
  password: {
     type: String, 
    required: true 
},
passwordConfirm :{
    type:String,
    required:true,
    validate:{
        validator :function(ele){
            return ele=== this.password ;

        },
        message :'password are not the same '

    }

},
  role: { 
    type: String,
     enum: ['admin', 'member'],
      default: 'member'
     },
  membership: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: true
  } ,
  photo :{
    type :String ,
    default: 'defult.png'
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  //delete me 
  active:{
      type:Boolean ,
      default :true ,
      select :false
  }
});

// manging password 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 3600000;
    return resetToken;
};

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000; 
    next();
});


userSchema.methods.changePasswordAfter = function (tokenIssuedAt) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return tokenIssuedAt < changedTimestamp;
    }
    // False if password was never changed
    return false;
};

 // function Delete Me  /^find/ reqular expression  not found 
  userSchema.pre(/^find/ ,function (next) {
    this.find({active:{$ne :false}}) ;
    next();

 })



const User =  mongoose.model('User', userSchema);
module.exports =User ;