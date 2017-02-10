import { combineReducers } from 'redux'
import approve from './approve'
import branch from './branch'
import popup from './popup'
import superPopup from './superPopup'


const rootRuducer = combineReducers({
    approve,superPopup,branch,popup
})

export default rootRuducer
