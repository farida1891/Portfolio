const mongoose = require("mongoose"); // Import mongoose
const mongoose_delete = require('mongoose-delete'); // Import mongoose-delete to make soft delete
const bcrypt = require('bcrypt')



// Make barang model


var UserSchema = new mongoose.Schema({

  // Define column that we will used

  fullname: {
    type: String,
    allowNull: false,
  },
  
  email: {
    type: String,
    unique:true,
    allowNull: false
  },
  password: {
    type: String,

  },
  role: {
    type: String,
    required: true
   },
   description: {
    type: String,
    required: false
   },
   phone: {
    type: String,
    required: false
   },
  profilePic: {
    type: String,
    required: false

  }
}, {
  // enable timestamps
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false // Disable versioning __v = 0,

})


UserSchema.path('profilePic').get((profilePic) => {
  if (profilePic !== null) {
    return '/user/' + profilePic
  } else {
    return '/user/profile-picture.jpg'
  }
})

UserSchema.set('toJSON', {
  getters: true
})

UserSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
}); // enable soft delete
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = user = mongoose.model('user', UserSchema, 'user'); // export barang model
