const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
        callback(null, uniqueName);
    }
});

const profileUpload = multer({
    fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpg', 'image/png', 'image/jpeg'];

        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Only JPG, JPEG, PNG allowed'), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2MB
    }
});

const resumeUpload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype === 'application/pdf') {
            callback(null, true);
        } else {
            callback(new Error('Only PDF files allowed'), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2MB
    }
});

const jdUpload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type'), false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2 
    }
});

module.exports = {
    profileUpload,
    resumeUpload,
    jdUpload
};