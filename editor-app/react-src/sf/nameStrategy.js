
export default (shape,cb) => {
    if(
        fm.last.is('User task',shape) ||
        fm.manual.is.sf(shape)
    ){
        return cb()
    }else{
        return true
    }
}
