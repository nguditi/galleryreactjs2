import {SET_MAXPAGE} from "../Constants/ActionTypes";

const maxPage = (state = [], action) => {
    switch (action.type) {
        case SET_MAXPAGE:
            let tmp = action.maxpage;
            return tmp;
        default:
            return state
    }
}

export default maxPage
