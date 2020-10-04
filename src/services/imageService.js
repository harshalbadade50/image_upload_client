import axios from 'axios';

export const uploadImagesService = (image) => {
    return axios.post("http://localhost:9000/image/uploadImage", image);
}

export const getAllImagesService = () => {
     return axios.get('http://localhost:9000/image/fetchImages');
}