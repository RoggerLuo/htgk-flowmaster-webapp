export default function(el, index, modelData) {
    
    let sf = []
    
    delete modelData.childShapes[index].properties.conditionsequenceflow



    // 如果是 普通分支的sf， 那么就初始化到 sf branch的redux
    if (!el.properties.reduxData_branch) {
        // return;
    } else {
        rdx.dispatch({ type: 'sequenceDataInit', data: el.properties.reduxData_branch })
    }



    /* exclusive gate的内容 */
    if (el.properties.defaultflow == "true") {  //如果设置了branchNode, 则在这里更新
        /*  
            寻找sequenceflow的上一个节点（分支）, 无法使用getShapeById、getIncoming，尚未初始化
            所以，循环所有的节点，找他们的outgoing里面是不是有这个sequenceflow的resourceId
        */
        const currentId = el.resourceId
        const allShapes = modelData.childShapes
        const getGateBySf = () => {
            const filtered = allShapes.filter((child) => { // 遍历所有的节点
                return child.outgoing.some((next_shape) => {
                    return next_shape.resourceId == currentId
                }) 
            })
            return filtered[0]
        }
        const getShape = (id) => {
            const filtered = allShapes.filter((child) => {
                return child.resourceId == id
            })
            return filtered[0]
        }

        //[0].properties.name
        const exclusiveGate = getGateBySf()
        const nextShapeName = getShape(el.outgoing[0].resourceId).properties.name
        // modelData.childShapes.filter((everyChild) => { // 遍历所有的节点
        //     return everyChild.outgoing.some((outgoingEl) => outgoingEl.resourceId == el.resourceId) //如果outgoing中有这个节点
        // })[0]

        // let elName = modelData.childShapes.filter((eachChild) => eachChild.resourceId == el.outgoing[0].resourceId)[0].properties.name
        const branchDataObj = exclusiveGate.outgoing.map((sf) => {            
            const sf_shape = getShape(sf.resourceId)  //allShapes.filter((child) => child.resourceId == sf.resourceId)[0]
            const sf_next_shape = sf_shape.outgoing[0] //.resourceId
            const sf_next_shape_name = getShape(sf_next_shape.resourceId).properties['oryx-name']   //allShapes.filter((eachChild) => eachChild.resourceId == currentElement.outgoing[0].resourceId)[0].properties['oryx-name']

            return { branchResourceId: sf.resourceId, name, defaultflow: '', choosed: 'false' }
        })


        const reduxDataObj = { 
            resourceId: exclusiveGate.resourceId, 
            data: branchDataObj, 
            choosed: { text: nextShapeName, value: el.resourceId } 
        }
        
        if (reduxDataObj.data.length) {
            /* 要放在switchElement后面，不然会顺序会出问题，元素id还没更新 */
            rdx.dispatch({ type: 'branchNodeInit', data: reduxDataObj })
        }
    

        //问题出在这里，就算设置了branchNode
        //也要更新sf

        if (el.properties.reduxData) {
            rdx.dispatch({ type: 'sf/init', data: el.properties.reduxData })
        }

    } else {
        

        if (el.properties.reduxData) {
            rdx.dispatch({ type: 'sf/init', data: el.properties.reduxData })
        }
        // delete modelData.childShapes[index].properties.reduxData
        // delete modelData.childShapes[index].properties.businessStatusId
    }


    // delete modelData.childShapes[index].properties.name
    delete modelData.childShapes[index].properties.reduxData
    delete modelData.childShapes[index].properties.reduxData_branch
    delete modelData.childShapes[index].properties.defaultflow
    delete modelData.childShapes[index].properties.conditionsequenceflow

    delete modelData.childShapes[index].properties.isInGates
    delete modelData.childShapes[index].properties.businessStatusId

}