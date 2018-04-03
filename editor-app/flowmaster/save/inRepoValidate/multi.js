// 通过 return true
export default (repo, shape) => {
    return !repo.data.some((group) => {
        if (group.length === 0) {
            fm.save.rolesEmptyWarning(shape)
            return true
        } 
        return false
    })
}
