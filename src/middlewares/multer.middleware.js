import multer from "multer";
//iss file ke baare mein btao


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/temp");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

export const upload = multer({
    storage,
});

