
export default function({ name, method }) {
    const reduceName = name
    const cb = method
    return !rdx.getState()[reduceName].repo.some((repo) => {
        if(!repo.id) return 

        let shape = fm.getNodeById(repo.id)
        if (!shape) return
        // return true就是验证失败
        return cb(repo, shape)
    })
}
