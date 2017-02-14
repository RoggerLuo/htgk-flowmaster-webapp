import { combineReducers } from 'redux'
import approve from './approve'
import branch from './branch'
import popup from './popup'
import certainPerson from './certainPerson'
import superPopup from './superPopup'
import dropdown from './dropdown'


const rootRuducer = combineReducers({
    approve,superPopup,branch,popup,certainPerson,dropdown
})

export default rootRuducer
