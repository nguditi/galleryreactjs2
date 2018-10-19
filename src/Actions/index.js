import * as types from '../Constants/ActionTypes'

export const cleanPhoto = () => ({
    type: types.CLEAN_PHOTO,
})

export const addPhoto = (photos) => ({
    type: types.ADD_PHOTO,
    photos: photos,
})

export const changeTag = (tag) => ({
    type: types.CHANGE_TAG,
    tag:tag
})

export const setRequesting = (isRequest) => ({
    type: types.SET_REQUEST,
    isRequest:isRequest
})

export const setMaxpage = (max) => ({
    type: types.SET_MAXPAGE,
    maxpage:max
})