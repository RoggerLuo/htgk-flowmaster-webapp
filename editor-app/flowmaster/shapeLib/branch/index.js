global.fm = global.fm || {}
fm.branch = {}
fm.branch.is = {}
fm.branch.is.normal = (shape) => {
    const incoming = fm.getIncoming(shape)
    if(incoming){
        if(fm.getTitle(incoming) == 'Exclusive gateway') return true
    }
    return false
}
fm.branch.is.mulit = () => {}
fm.branch.is.manual = () => {}
fm.branch.is.not = () => {}