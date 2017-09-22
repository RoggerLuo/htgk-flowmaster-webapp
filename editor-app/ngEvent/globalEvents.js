'use strict'
import { fetchModelWrap } from './initialize'
global.isRepeated = (name) => {
    return window.getRawJson().childShapes.some((el, index) => {
        return el.properties.name == name
    })
}
global.activeSave = () => {
    global.reduxStore.dispatch({ type: 'saveActive' })
}

global.fetchModelWrap = fetchModelWrap