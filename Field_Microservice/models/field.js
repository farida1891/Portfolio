const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const FieldSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: Array
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

FieldSchema.path('image').get(img => {
  let imageMap = img.map(value =>
    value = /images/ + value)

  for (let i=0; i < img.length; i++) {
    var check = img[i].match(/images/)

    if (check === null) {
      return imageMap
    } else {
      return img
    }
  }
})

FieldSchema.set('toJSON', {
  getters: true
})

FieldSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

module.exports = field = mongoose.model('field', FieldSchema, 'field');
