import { post } from "./authService";

export const photo = (e) => {

    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    return post('/photo/add-photo', uploadData)

}