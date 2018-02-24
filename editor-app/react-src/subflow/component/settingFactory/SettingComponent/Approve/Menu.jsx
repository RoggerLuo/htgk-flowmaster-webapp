import React from 'react'

const MenuContainer = ({ currentRepo, children }) => {
    const reduxCate = currentRepo.data && currentRepo.data[0] && currentRepo.data[0].cate

    const add = (item) => rdx.dispatch({ type: 'subflow/addRole', item })

    const xClass = { marginTop: '5px', marginLeft: '-105px' }
    const Menu = fm.common.dropdownMenu.component
    return (
        <Menu xClass={xClass} onConfirm={add} existCate={reduxCate} buttonMode={'subflow'}>
            {children}
        </Menu>
    )
}
export default rdx.connect('subflow', MenuContainer)

// const clear = () => rdx.dispatch({ type: 'subflow/clear' })
