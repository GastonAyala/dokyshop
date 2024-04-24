const path = require('path');
const multer = require('multer');
const mimetypes = /png|jpg|jpeg|png|webp|svg|gif/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatar')
  },
  filename: function (req, file, cb) {
    const formatFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, formatFilename)
  }
})

const uploadAvatar = multer({
  storage,
  fileFilter(req, file, cb) {
    const isMimetypeValid = mimetypes.test(file.mimetype)

    if (isMimetypeValid) {
      return cb(null, true)
    }
    cb(null, false)
  }
});

module.exports = {
  uploadAvatar
};