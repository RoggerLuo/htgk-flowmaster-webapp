import { combineReducers } from 'redux'
import approve from './approve'
import branch from './branch'
import popup from './popup'
import certainPerson from './certainPerson'
import superPopup from './superPopup'
import dropdown from './dropdown'
import parallel from './parallel'


const rootRuducer = combineReducers({
    approve,
    superPopup,
    branch,
    popup,
    certainPerson,
    dropdown,
    parallel
})

export default rootRuducer
