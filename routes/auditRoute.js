// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const auditController = require("../controllers/auditController");

// router.get("/my-summary", auth, auditController.getUserAuditSummary);

// router.get("/", auth, auditController.getAllAuditLogs);

// router.get("/file-stats", auth, auditController.getFileDownloadStats);

// router.get("/user/:userId", auth, auditController.getAuditByUserId);

// module.exports = router;


const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/adminAuth');
const { getAllAuditLogs, getFilesByOrganization, getFileDownloadStats } = require('../controllers/auditController');

// Admin-only audit logs
router.get('/audit', verifyAdmin, getAllAuditLogs);

// Org-based files
router.get('/orgs/files/:orgId', verifyAdmin, getFilesByOrganization);

// Download stats
router.get('/files/stats', verifyAdmin, getFileDownloadStats);

module.exports = router;
