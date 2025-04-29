const File = require('../models/fileModel');
const AuditLog = require('../models/AuditLog');
const path = require('path');
const fs = require('fs');

// Upload a file
const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newFile = await File.create({
      fileName: file.filename,
      originalName: file.originalname,
      path: file.path,
      uploadedBy: req.user._id,
      organization: req.user.organization
    });

    // Create audit log
    await AuditLog.create({
      action: 'upload',
      file: newFile._id,
      user: req.user._id
    });

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download a file
const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Increment download count
    file.downloadCount += 1;
    await file.save();

    // Create audit log
    await AuditLog.create({
      action: 'download',
      file: file._id,
      user: req.user._id
    });

    const filePath = path.resolve(file.path);

    // Ensure file exists before download
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on disk' });
    }

    res.download(filePath, file.originalName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {uploadFile,downloadFile};