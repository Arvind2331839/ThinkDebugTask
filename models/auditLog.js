const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: { type: String, enum: ['upload', 'download'] },
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
