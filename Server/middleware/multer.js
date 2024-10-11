const multer = require("multer");
console.log('multer file--------------->');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("is multer destination working???");
    
    return cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const randomNumber = Date.now() + "-" + Math.round(1000 + Math.random() * 9999);
    console.log("randomNumber in multer------------>>>>", randomNumber);

    cb(null, `${randomNumber}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
