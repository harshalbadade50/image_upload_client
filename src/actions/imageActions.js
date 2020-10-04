import { uploadImagesService, getAllImagesService } from '../services/imageService.js';

// upload image to db
export function uploadImages(imageObj) {
    return function (dispatch) {
        uploadImagesService(imageObj).then(res => {
            if (res && res.data && res.data.insertedCount === 1) {
               dispatch(showToastMessage("Image Uploaded Successfully!", "success"));
               // once the image is uploaded fetch all the images
               dispatch(getAllImages());
            }
        }).catch(err => {
            dispatch(showToastMessage("Error in Uploading Image.", "error"));
            console.log('Error in fetching Image details - ', err);
        });
    }
}

// fetch all the images from db
export function getAllImages() {
    return function (dispatch) {
        getAllImagesService().then(allImgRes => {
            if(allImgRes && allImgRes.data){
                dispatch(setImages(allImgRes.data));
            }
        })
    }
}

export function setImages(imageList) {
    return {
        type: "SET_ALL_IMAGES",
        imageList: imageList
    }
}

export function showToastMessage(message, severity) {
    return {
        type: "SET_TOASTMESSAGE_FLAG",
        flag: true,
        severity: severity,
        message: message
    }
}

export function hideToastMessage() {
    return {
        type: "SET_TOASTMESSAGE_FLAG",
        flag: false,
        severity: "error"
    }
}