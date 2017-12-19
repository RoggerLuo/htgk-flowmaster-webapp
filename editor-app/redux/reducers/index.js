import { combineReducers } from 'redux'
import approve from './approve'
import branch from './branch'
import popup from './popup'
import popupX from './popupX'
import certainPerson from './certainPerson'
import superPopup from './superPopup'
import dropdown from './dropdown'
import parallel from './parallel'
import common from './common'
import endpoint from './endpoint'
import branchNode from './branchNode'
import manual from './manual'
import sql from './sql'
import circulation from './circulation'
import custom from './custom'
import subflow from './subflow'


const rootRuducer = combineReducers({
    approve,
    superPopup,
    branch,
    popup,
    certainPerson,
    dropdown,
    parallel,
    common,
    endpoint,
    branchNode,
    manual,
    sql,custom,
    circulation,
    subflow,
    popupX
})

export default rootRuducer
