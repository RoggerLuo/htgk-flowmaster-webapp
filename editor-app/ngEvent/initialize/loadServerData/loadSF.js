export default function(el, index, modelData) {
    let sf = []
    if (!el.properties.reduxdata) {
        // return;
    } else {
        window.reduxStore.dispatch({ type: 'sequenceDataInit', data: el.properties.reduxdata })
    }
    /* exclusive gate的内容 */
    if (el.properties.defaultflow == "true") {
        /*  
            寻找sequenceflow的上一个节点（分支）
            循环所有的节点，找他们的outgoing里面是不是有这个sequenceflow的resourceId
        */
        const theExclusiveGate = modelData.childShapes.filter((everyChild) => {
            return everyChild.outgoing.some((outgoingEl) => {
                return outgoingEl.resourceId == el.resourceId
            })
        })[0]

        let elName = modelData.childShapes.filter((eachChild) => eachChild.resourceId == el.outgoing[0].resourceId)[0].properties.name
        const branchObj = theExclusiveGate.outgoing.map((elOfEx) => {
            let currentElement = modelData.childShapes.filter((eachChild) => eachChild.resourceId == elOfEx.resourceId)[0]
            let name = modelData.childShapes.filter((eachChild) => eachChild.resourceId == currentElement.outgoing[0].resourceId)[0].properties['oryx-name']
            return { branchResourceId: elOfEx.resourceId, name, defaultflow: 'df', choosed: 'false' }
        })


        const reduxObj = { resourceId: theExclusiveGate.resourceId, data: branchObj, choosed: { text: elName, value: el.resourceId } }
        if (reduxObj.data.length) {
            /* 要放在switchElement后面，不然会顺序会出问题，元素id还没更新 */
            window.reduxStore.dispatch({ type: 'branchNodeInit', data: reduxObj })
        }
    } else {
        if (el.properties.reduxData) {
            rdx.dispatch({ type: 'sf/init', data: el.properties.reduxData })
        }
        delete modelData.childShapes[index].properties.reduxData
        delete modelData.childShapes[index].properties.businessStatusId
    }


    // delete modelData.childShapes[index].properties.name
    delete modelData.childShapes[index].properties.reduxdata
    delete modelData.childShapes[index].properties.defaultflow
    delete modelData.childShapes[index].properties.conditionsequenceflow
}