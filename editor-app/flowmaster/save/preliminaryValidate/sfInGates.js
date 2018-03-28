export default function(shape) {
    const gate = fm.parallelGate.isShapeIn(shape)
    if (gate) {
        shape.setProperty('isInGates', true)
    } else {
        shape.setProperty('isInGates', false)
    }    
}
