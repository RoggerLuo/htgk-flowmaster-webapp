import React from 'react'
import {connect} from 'react-redux'
import RolesFrameGenerator from '../RolesFrameGeneratorNotForParallel'

function ConfiguredRoleComp({ data }){
    const del = index => () => {
        rdx.put('usertask','delete',['data'],index)
        activeSave()
    }

    const add = (item) => {
        rdx.dispatch({type:'usertask/addRole',item})
        activeSave()
    }
    const clear = () => {
        rdx.dispatch({type:'usertask/clear'})
        activeSave()
    }

    const cate = data[0] && data[0].cate || false
    
    const { DefaultContainer, DbRoleContainer, ExternalCallback } = RolesFrameGenerator({del,add,clear})
    switch(cate){
        case 'externalCallback':
            return (<ExternalCallback data={data} />)
        case 'fromDb':
            return (<DbRoleContainer data={data}/>)
        default:
            return (<DefaultContainer data={data}/>)
    }
}
export default ConfiguredRoleComp
