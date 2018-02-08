import React from 'react'
import approvePool_factory from '../approvePoolFactory_not4Parallel'

export default ({ data }) => {
    const del = index => () => rdx.put('usertask', 'delete', ['data'], index)
    const add = (item) => rdx.dispatch({ type: 'usertask/addRole', item })
    const clear = () => rdx.dispatch({ type: 'usertask/clear' })
    const cate = data[0] && data[0].cate || false
    return approvePool_factory(cate, data, { del, add, clear })
}