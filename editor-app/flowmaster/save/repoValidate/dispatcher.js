export default function({ name, method }) {
    const reduceName = name
    const cb = method
    // return true就是验证成功 
    return !rdx.getState()[reduceName].repo.some((repo) => {
        if(!repo.id) return false
        const shape = fm.getNodeById(repo.id)
        if (!shape) return false
        return !cb(repo, shape)
    })
}
