import React from 'react'
import approvePool_factory from '../../approvePoolFactory_not4Parallel'

function ApprovePool({ currentRepo }){
    if(!currentRepo) return null
    const data = currentRepo.data || []

    const del = (index) => rdx.dispatch({type:'subflow/deleteRole',index})
    const add = (item) => rdx.dispatch({type:'subflow/addRole',item})
    const clear = () => rdx.dispatch({type:'subflow/clear'})

    const cate = data[0] && data[0].cate || false
    return approvePool_factory(cate, data, { del, add, clear })   
}
export default rdx.connect('subflow',ApprovePool)

