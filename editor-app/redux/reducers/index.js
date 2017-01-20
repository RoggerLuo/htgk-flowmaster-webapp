import { combineReducers } from 'redux'
import approve from './approve'
import superPopup from './superPopup'


const rootRuducer = combineReducers({
    approve,superPopup
})

export default rootRuducer
/*
state
{
    choosedModule:{},
    enteredModule:{},
    leftNotes:{data:[],choosed:{}},
    rightNotes:{data:[],choosed:{}},
    editor:{
        item_id,
        content,
        date_and_time,
        thread_id,
    }
    editorSetting:{}
    leftLeader
    rightLeader

}
*/