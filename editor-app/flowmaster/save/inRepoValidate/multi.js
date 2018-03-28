export default (repo, shape) => {
    //   通过 return true
    return repo.data.some((group) => {
        if (group.length === 0) {
            fm.save.rolesEmptyWarning(shape)
            return false
        } else {
            return true
        }   
    })
}
