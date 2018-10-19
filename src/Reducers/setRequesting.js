import {SET_REQUEST} from "../Constants/ActionTypes";

const setRequesting = (state = false , action) => {
    switch (action.type) {
        case SET_REQUEST:
            let tmp = action.isRequest;
            return tmp;
        default:
            return state
    }
}

export default setRequesting
