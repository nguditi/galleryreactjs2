import {ADD_PHOTO,CLEAN_PHOTO} from "../Constants/ActionTypes";


let inital = {page:1,photo:[]};

const updatePhoto = (state = inital , action) => {
    switch (action.type) {
        case ADD_PHOTO:
            let tmp = state.photo.concat(action.photos);
            let tmpPage = state.page + 1;
            return {page:tmpPage,photo:tmp};
        case CLEAN_PHOTO:
            return {page:1,photo:[]};
        default:
            return state
    }
}

export default updatePhoto
