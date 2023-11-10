import multer from 'multer'
// import fs from 'node:fs'

const almacenamiento = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads/');
        // res.send('imagen montada')
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+'-'+file.originalname);
        // fs.renameSync(file.path, cd)
    }
})

const upload = multer({storage:almacenamiento});

export default upload
