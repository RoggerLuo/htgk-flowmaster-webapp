'use strict'
import './everyMove'
import startevent from './startevent'
import usertask from './usertask'
import inclusive from './inclusive'
import {multiBranch_ByGateway,select_multi} from './multi'
import manual from './manual'

global.restrictionRule = function(option) {
    const selectedShape = option.connectedShape 
    const title = selectedShape && selectedShape._stencil._jsonStencil.title || 'canvas'
    switch(title){
        case "Exclusive gateway":
            return multiBranch_ByGateway(selectedShape)
        case 'Multi user task':
            return select_multi(selectedShape)
        case 'Start event':
            return startevent(selectedShape)
        case 'User task':
            return usertask(selectedShape)
        case 'Manual task':
            return manual(selectedShape)
        case 'Sequence flow':
            // debugger
            return
        case 'Inclusive gateway':
            return inclusive(selectedShape)
    }
    return true
}