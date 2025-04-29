const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const verifyUser = require('../middleware/userAuth');
const { uploadFile, downloadFile } = require('../controllers/fileController');

// Upload file- Authenticated
router.post('/upload', verifyUser, upload.single('file'),uploadFile);

// Download file- Authenticated
router.get('/download/:id', verifyUser, downloadFile);

module.exports = router;
