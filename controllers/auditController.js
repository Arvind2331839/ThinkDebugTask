const AuditLog = require('../models/AuditLog');
const File = require('../models/fileModel');

const getAllAuditLogs = async (req, res) => {
  try {
    // Only admin allowed
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const logs = await AuditLog.find()
      .populate('user', 'name email')
      .populate('file', 'originalName fileName')
      .sort({ timestamp: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFilesByOrganization = async (req, res) => {
  try {
    const { orgId } = req.params;

    const files = await File.find({ organization: orgId })
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getFileDownloadStats = async (req, res) => {
  try {
    const stats = await AuditLog.aggregate([
      { $match: { action: 'download' } },
      {
        $group: {
          _id: '$file',
          downloadCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'files',
          localField: '_id',
          foreignField: '_id',
          as: 'fileDetails'
        }
      },
      { $unwind: '$fileDetails' },
      {
        $project: {
          fileId: '$_id',
          originalName: '$fileDetails.originalName',
          downloadCount: 1
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {getAllAuditLogs, getFilesByOrganization, getFileDownloadStats};