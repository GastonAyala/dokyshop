//  configuraciones referente a multer:

const path = require('path');
const multer = require('multer')


//// comienzo multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/avatar')      // ruta donde debe almacenas las imagenes
    },
    filename: function (req, file, cb) {
      const formatFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, formatFilename)
    }
  })
  
  const uploadAvatar = multer({ storage });

  module.exports = {
    uploadAvatar
  }
