import { combineReducers } from 'redux'
import approve from './approve'
import branch from './branch'
import popup from './popup'
import certainPerson from './certainPerson'
import superPopup from './superPopup'


const rootRuducer = combineReducers({
    approve,superPopup,branch,popup,certainPerson
})

export default rootRuducer
