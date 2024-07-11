const multer =require('multer'); 
const multerStorage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,'public/img/users')
    },
    filename:(req,file,cb)=>{
        // user-userid-date.jpeg
        const ext=file.mimetype.split('/')[1];
        cb(null,`user-${Date.now()}.${ext}`)
    }
    });
const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError ('not an image ! please upload only images ' ,404),false )
    }
};

const upload =multer({
    storage:multerStorage,
    fileFilter:multerFilter

});
exports.uploadImage = upload.single('photo');