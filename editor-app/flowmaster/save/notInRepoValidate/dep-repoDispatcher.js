export default function(name,method) {
    const reduceName = name
    return !rdx.getState()[reduceName].repo.some(method)
}
/*
.some((repo) => {
        if(!repo.id) return false
        const shape = fm.getNodeById(repo.id)
        if (!shape) return false
        // return true就是验证成功 
        return method(repo, shape)
    })
*/