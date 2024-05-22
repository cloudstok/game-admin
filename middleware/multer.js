const multer = require('multer')


 const upload = multer({
    fileFilter: function (req , file  , cb, res){
        const fileSize = parseInt(req.headers["content-length"])
        let mimetype = file.mimetype == "image/png" || 
               file.mimetype == "image/jpg" || 
               file.mimetype =='application/pdf' ||
               file.mimetype == "image/jpeg" ||
               file.mimetype == "image/webp" ||
               file.mimetype == "video/mp4" ||
               file.mimetype == "image/avif" 
        if(!mimetype && fileSize >= 22282810){
            cb(null, false)
           return res.send({mgg : "only png & jpg & pdf file supported"})
            
           }else{
               cb(null, true);
           }
    },
    // limits:{fileSize : 1048576}	      
})   

module.exports =upload
             