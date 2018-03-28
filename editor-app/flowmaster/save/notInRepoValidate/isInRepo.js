export default function(name,shape,cb){
    const isIn = rdx.getState()[name].repo.some(repo=>shape.resourceId === repo.id)
    if(!isIn){
        return cb()
    }else{
        return true
    }
}
