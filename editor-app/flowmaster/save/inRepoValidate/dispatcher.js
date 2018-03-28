export default function({ name, method }) {
    const reduceName = name
    const cb = method
    // return true就是验证成功 
    return !rdx.getState()[reduceName].repo.some((repo) => {
        // 里面要return false 验证成功 
        if(!repo.id) return false
        const shape = fm.getNodeById(repo.id)
        if (!shape) return false
        return !cb(repo, shape)
    })
}
