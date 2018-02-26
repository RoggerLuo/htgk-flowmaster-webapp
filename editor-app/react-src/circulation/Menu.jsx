import React from 'react'

const Menu = ({currentRepo, children}) => { 
    if(!currentRepo) return null
    const reduxCate = currentRepo.data && currentRepo.data[0] && currentRepo.data[0].cate || ''

    const add = (item) => rdx.dispatch({type:'circulation/addRole',item})   
    const xClass = {marginTop:'5px',right:'12px'}

    const Menu = fm.common.dropdownMenu.component
    return ( 
        <Menu xClass={xClass} onConfirm={add} existCate={reduxCate}>
            {children}
        </Menu>
    )
}
export default rdx.connect('circulation', Menu)
