export default function(selectedShape) {
    let name = selectedShape && selectedShape._stencil._jsonStencil.title || false

    if(global.isMultiGateway(selectedShape)){
        // giveMarkToMultiBranch(selectedShape)
        window.setPropertyAdvance({ key: 'name', value: '会签分支' }, selectedShape)
        window.setPropertyAdvance({ key: 'classify', value: 'countersign' }, selectedShape)
    }

    if(name == 'Manual task'){
        window.setPropertyAdvance({ key: 'name', value: '人工节点' }, selectedShape)
        window.setPropertyAdvance({ key: 'classify', value: 'manual' }, selectedShape)
    }

}