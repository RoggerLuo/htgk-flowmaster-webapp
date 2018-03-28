export default function({ name, method }) {
    const reduceName = name
    const cb = method
    return !rdx.getState()[reduceName].repo.some((repo) => {
        if(!repo.id) return false
        const shape = fm.getNodeById(repo.id)
        if (!shape) return false
        // return true就是验证成功 
        return cb(repo, shape)
    })
}
