
const fs = require('fs');
const path = require('path');
const multer = require('multer');


const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

function ensureUploadsDir() {
  const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  return uploadDir;
}

const createStorage = (folder) => {
  // Only local uploads supported
  const uploadDir = ensureUploadsDir();
  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  });
};

const createUploader = (folder) => multer({
  storage: createStorage(folder),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only photo formats (JPG, PNG, GIF, HEIC, etc.) are allowed'));
    }
    return cb(null, true);
  },
});

function getUploadedAsset(file) {
  if (!file) return null;
  if (file.path && /^https?:/i.test(file.path)) {
    return { publicId: file.filename || file.public_id, url: file.path };
  }
  if (file.filename) {
    return { publicId: file.filename, url: `/uploads/${file.filename}` };
  }
  return null;
}

module.exports = {
  uploadProfileImage: createUploader('pulse-investors/profiles'),
  uploadDepositProof: createUploader('pulse-investors/deposits'),
  getUploadedAsset,
};
