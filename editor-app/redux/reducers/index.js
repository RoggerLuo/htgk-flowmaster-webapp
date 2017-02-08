import { combineReducers } from 'redux'
import approve from './approve'
import branch from './branch'
import superPopup from './superPopup'


const rootRuducer = combineReducers({
    approve,superPopup,branch
})

export default rootRuducer
