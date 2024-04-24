//  configuraciones referente a multer:

const path = require('path');
const multer = require('multer')
const mimetypes = /png|jpg|jpeg|png|webp|svg|gif/;

//// comienzo multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/products')      // ruta donde debe almacenas las imagenes
    },
    filename: function (req, file, cb) {
      const formatFilename = file.fieldname + '-' + Date.now() + (Math.floor(Math.random() * 100) + 1) + path.extname(file.originalname);
      cb(null, formatFilename)
    }
  })
  
  const uploadProducts = multer({ 
    storage, 
    fileFilter(req, file, cb) {
      const isMimetypeValid = mimetypes.test(file.mimetype)

      if(isMimetypeValid) {
        return cb(null, true)
      }
      cb(null, false)
  }
});

module.exports = {
    uploadProducts
  }

  //// fin multer