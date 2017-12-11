import React from 'react'
import {connect} from 'react-redux'
import RolesFrameGenerator from '../../RolesFrameGeneratorNotForParallel'

function ConfiguredRoleComp({ data, dispatch }){
    
    const del = (index) => function(){
        dispatch({type:'subflow/deleteRole',index})
        activeSave()
    }
    const add = (item) => {
        dispatch({type:'subflow/addRole',item})
    }
    const clear = () => dispatch({type:'subflow/clear'})
    
    const { DefaultContainer, DbRoleContainer } = RolesFrameGenerator({del,add,clear})
    const cate = data[0] && data[0].cate || false
    switch(cate){
        case 'fromDb':
            return (<DbRoleContainer data={data}/>)
        default:
            return (<DefaultContainer data={data}/>)
    }
}
const mapStateToProps = (state) => {
    const repo = state.subflow.repo
    const id = state.subflow.id
    const currentRepo = repo.filter((el,index)=>el.id == id) 
    if(currentRepo.length==0) return {data:[]}
    const data = currentRepo[0].data
    return {data} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(mapStateToProps,mapDispatchToProps)(ConfiguredRoleComp)    

