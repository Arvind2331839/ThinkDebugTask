const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: String,
  originalName: String,
  path: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  downloadCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('File', fileSchema);
