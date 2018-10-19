import {CHANGE_TAG} from "../Constants/ActionTypes";

const changeTag = (state = [], action) => {
    switch (action.type) {
        case CHANGE_TAG:
            let tmp = action.tag;
            return tmp;
        default:
            return state
    }
}

export default changeTag
