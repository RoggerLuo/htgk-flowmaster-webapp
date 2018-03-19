export default function() {
    fm.getNodes().forEach(shape => { //遍历 所有的元素 进行判断是否在并行汇聚节点中
        
        const gate = fm.parallelGate.isShapeIn(shape)
        shape.setProperty('isInGates', !!gate)        
        
        if (gate) {

            const sf = gate.incoming[0]
            /* 所有在parallel gate里面的sf，用它所在的parallel gate的前一根连线的 业务状态businessStatusId*/
            if (sf && sf.properties.businessStatusId) {
                const bsid = sf.properties.businessStatusId
                shape.setProperty('businessStatusId', bsid)
            }
        }
    })
}