import { combineReducers } from 'redux'
import approve from './approve'
import branch from './branch'
import popup from './popup'
import certainPerson from './certainPerson'
import superPopup from './superPopup'
import dropdown from './dropdown'
import parallel from './parallel'
import common from './common'
import endpoint from './endpoint'
import branchNode from './branchNode'
import manualTask from './manualTask'
import sql from './sql'


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
    manualTask,
    sql
})

export default rootRuducer
