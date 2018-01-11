global.fm = global.fm || {}
fm.multi = {}
fm.multi.is = {}
fm.multi.is.gateway = (shape) => {
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

fm.multi.is.sf = (shape) => {
    if (shape && (fm.getTitle(shape) == "Sequence flow")) {
        if (!shape.incoming[0]) return false
        const prevShape = shape.incoming[0]
        return fm.multi.is.gateway(prevShape)
    }
    return false
}
