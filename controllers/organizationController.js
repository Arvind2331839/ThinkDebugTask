const Organization = require('../models/organizationModel');
const User = require('../models/userModel');
const File = require('../models/fileModel');

// Create a new organization
const createOrganization = async (req, res) => {
  try {
    const { name } = req.body;
    const org = new Organization({ name });
    await org.save();
    res.status(201).json(org);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {createOrganization};
