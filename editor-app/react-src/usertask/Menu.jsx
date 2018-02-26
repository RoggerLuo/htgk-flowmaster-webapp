import React from 'react'

const UserTaskMenu = ({ currentRepo, children, isEmpty }) => {
    if (!currentRepo) return null
    const cate = currentRepo.data && currentRepo.data[0] && currentRepo.data[0].cate || ''
    const add = (item) => rdx.dispatch({ type: 'usertask/addRole', item })
    const params = {
        xClass: { marginTop: '5px', right: '12px' },
        onConfirm: add,
        existCate: cate,
        groupInd: 0,
        isEmpty
    }
    const Menu = fm.common.dropdownMenu.component
    return (<Menu {...params}> {children} </Menu>)
}
export default rdx.connect('usertask', UserTaskMenu)
