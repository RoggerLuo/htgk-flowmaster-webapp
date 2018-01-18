'use strict'
import after_executed from './after_executed'
import drop_and_quickAdd from './drop_and_quickAdd'
// import startevent from './startevent'
// import usertask from './usertask'
// import inclusive from './inclusive'
// import {multiBranch_ByGateway,select_multi} from './multi'
// import manual from './manual'

// if (!window.restrictionRule(option)) return false
fm.restrict = {}
fm.restrict.drop_and_quickAdd = drop_and_quickAdd
fm.restrict.after_executed = after_executed
// fm.restrict.drop_and_quickAdd = function(option) {
//     const shape = option.connectedShape 
//     const title = shape && fm.getTitle(shape) || 'canvas'
//     switch(title){
//         case "Exclusive gateway":
//             return multiBranch_ByGateway(shape)
        
//         case 'Multi user task':
//             return select_multi(shape)

//         case 'Start event':
//             return startevent(shape)
//         case 'User task':
//             return usertask(shape)
//         case 'Manual task':
//             return manual(shape)
//         case 'Sequence flow':
//             // debugger
//             return
//         case 'Inclusive gateway':
//             return inclusive(shape)
//     }
//     return true
// }
