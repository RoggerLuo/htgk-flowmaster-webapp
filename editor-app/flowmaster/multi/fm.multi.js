global.fm = global.fm || {}
fm.multi = {}
fm.multi.identify = {}
fm.multi.identify.isGateway = (shape) => {
    if (shape && (fm.getTitle(shape) == "Exclusive gateway")) {
        const prevShape = shape.incoming[0]
        if (prevShape) {
            const prevPrevShape = prevShape.incoming[0]
            if (prevPrevShape) {
                if (fm.getTitle(prevPrevShape) == 'Multi user task') return true
            }
        }
    }
    return false
}

fm.multi.identify.sf = (shape) => {
    if (shape && (fm.getTitle(shape) == "Sequence flow")) {
        if (!shape.incoming[0]) return false
        const prevShape = shape.incoming[0]
        return fm.multi.identify.isGateway(prevShape)
    }
    return false
}
// import './identify'  //dep
