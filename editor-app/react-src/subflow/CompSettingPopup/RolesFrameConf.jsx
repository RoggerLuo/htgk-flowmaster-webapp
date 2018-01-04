import React from 'react'
import {connect} from 'react-redux'
import RolesFrameGenerator from '../../RolesFrameGeneratorNotForParallel'

function ConfiguredRoleComp({ currentRepo }){
    if(!currentRepo) return null
    const data = currentRepo.data || []

    const del = (index) => function(){
        rdx.dispatch({type:'subflow/deleteRole',index})
        activeSave()
    }
    const add = (item) => {
        rdx.dispatch({type:'subflow/addRole',item})
    }
    const clear = () => rdx.dispatch({type:'subflow/clear'})
    
    const { DefaultContainer, DbRoleContainer } = RolesFrameGenerator({del,add,clear})
    const cate = data[0] && data[0].cate || false
    switch(cate){
        case 'fromDb':
            return (<DbRoleContainer data={data}/>)
        default:
            return (<DefaultContainer data={data}/>)
    }
}
export default rdx.connect('subflow',ConfiguredRoleComp) //(mapStateToProps,mapDispatchToProps)(ConfiguredRoleComp)    

