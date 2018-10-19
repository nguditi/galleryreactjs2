import { combineReducers } from 'redux'
import changeTag from './changeTag'
import updatePhoto from './updatePhoto'
import setRequesting from './setRequesting'
import maxPage from './maxPage'


export default combineReducers({
    updatePhoto,
    changeTag,
    setRequesting,
    maxPage,
});
