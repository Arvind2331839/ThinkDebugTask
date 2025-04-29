const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
// const isAdmin = require('../middleware/isAdmin');
// const orgController = require('../controllers/orgController');
const { createOrganization } = require('../controllers/organizationController');

router.post('/createOrganization',createOrganization );
// router.get('/', auth, isAdmin, orgController.getOrganizations);
// router.get('/:orgId', auth, isAdmin, orgController.getOrganizationById);
// router.get('/:orgId/files', auth, orgController.getFilesByOrgId);

module.exports = router;
