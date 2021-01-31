const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');

const ReviewSchema = new mongoose.Schema({
  // booking: {
  //   type: mongoose.Schema.Types.Mixed,
  //   required: true
  // },
  user: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  feedback: {
    type: Number,
    required: true
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
});

ReviewSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

module.exports = review = mongoose.model("review", ReviewSchema, "review");
