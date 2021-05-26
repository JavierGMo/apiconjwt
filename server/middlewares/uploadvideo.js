import cloudinary from 'cloudinary';

const APIKEY = '681124946836714';
const APISECRETE = 'hXk3MQZdwKMQByxE6CWJ-DBvyFQ';
const CLOUDNAME = 'dtm5g2obd';
const URL = `https://api.cloudinary.com/v1_1/dtm5g2obd/image/upload?upload_preset=udhohmmb`;

cloudinary.v2.config({
    cloud_name: CLOUDNAME,
    api_key: APIKEY,
    api_secret: APISECRETE
});


function uploadVideo(req, res, next){
    console.log(req.body);
    console.log(req.files);
    console.log(`Multiples`);
    res.json({
        ok : true,
        message : `success`
    });
    
    // const nameVideo = req.body.nameVideo;
    // cloudinary.v2.uploader.upload(nameVideo, {
    //     resource_type: "video", 
    //     public_id: "assets/",
    //     chunk_size: 6000000,
    //     eager: [
    //     { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
    //     { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
    //     eager_async: true,
    //     },
    //     function(error, result){
    //         console.error('Resultado');
    //         console.log(result);
    //         console.error(error);
    //     });
}
export default uploadVideo;