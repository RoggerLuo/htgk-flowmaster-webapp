

export default function(shape) {
    const gate = fm.parallelGate.isShapeIn(shape)
    if(gate){
        shape.setProperty('isInGates', true)
    }else{
        shape.setProperty('isInGates', false)
    }
    
}

// 要放在 sf校验之后, 因为涉及连线命名
/* 所有在parallel gate里面的sf，用它所在的parallel gate的前一根连线的 业务状态businessStatusId*/

//shape.setProperty('businessStatusId', getId(gate))
/*function getId(gate){
    let businessStatusId = false
    const sf = gate.incoming[0]
    if (sf && sf.properties.businessStatusId) {
        businessStatusId = sf.properties.businessStatusId
    }
    return businessStatusId
}*/