import React from 'react'
import {connect} from 'react-redux'
import RolesFrameGenerator from '../RolesFrameGeneratorNotForParallel'

function ConfiguredRoleComp({ data, dispatch}){
    const del = (index) => function(){
        rdx.dispatch({type:'manual/deleteRole',index})
        activeSave()
    }
    const add = (item) => rdx.dispatch({type:'manual/addRole',item})
    const clear = () => rdx.dispatch({type:'manual/clear'})
    const edit = () => rdx.dispatch({type:'popup/callPopupEdit'})
    
    const { DefaultContainer, DbRoleContainer } = RolesFrameGenerator({edit,del,add,clear})
    
    const cate = data[0] && data[0].cate || false
    switch(cate){
        case 'fromDb':
            return (<DbRoleContainer data={data}/>)
        default:
            return (<DefaultContainer data={data}/>)
    }
}
export default ConfiguredRoleComp

// const SubflowContainerConnected = rdx.connect('subflow',ConfiguredRoleComp)

// const mapStateToProps = (state) => {
//     return {state}
// }
// const mapDispatchToProps = (dispatch) => {
//     return {dispatch}
// }

//  connect(mapStateToProps,mapDispatchToProps)(ConfiguredRoleComp)    

