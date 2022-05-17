const multer = require('multer')
const fs = require('fs')

// multer name, destination setting
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = "./public/uploads"
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    cb(null, dir)
  },
  filename: function(req, file, cb) {
    const uploadName = `${file.fieldname}-${Date.now()}-${file.originalname}`
    cb(null, uploadName)
  }
})

// multer file filter setting
const fileFilter = function(req, file, cb) {
  // reject file outside of these file types
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    cb(null, true)
  } else {
    cb({message: 'Unsupported file format'}, false)
  }
}

// multer upload settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  // fileFilter: fileFilter
})

module.exports = upload